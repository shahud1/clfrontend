export default function(vjs) {
  var extend = function() {
      var args, target, i, object, property;
      args = Array.prototype.slice.call(arguments);
      target = args.shift() || {};
      for (i in args) {
        object = args[i];
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
              target[property] = extend(target[property], object[property]);
            } else {
              target[property] = object[property];
            }
          }
        }
      }
      return target;
    },
    getComputedStyle = function(el, pseudo) {
      return function(prop) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, pseudo)[prop];
        } else {
          return el.currentStyle[prop];
        }
      };
    },
    offsetParent = function(el) {
      if (el.nodeName !== 'HTML' && getComputedStyle(el)('position') === 'static') {
        return offsetParent(el.offsetParent);
      }
      return el;
    },
    getVisibleWidth = function(el, width) {
      var clip;

      if (width) {
        return parseFloat(width);
      }

      clip = getComputedStyle(el)('clip');
      if (clip !== 'auto' && clip !== 'inherit') {
        clip = clip.split(/(?:\(|\))/)[1].split(/(?:,| )/);
        if (clip.length === 4) {
          return (parseFloat(clip[1]) - parseFloat(clip[3]));
        }
      }
      return 0;
    },
    getScrollOffset = function() {
      if (window.pageXOffset) {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      }
      return {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
      };
    };

  /**
   * register the thubmnails plugin
   */
  vjs.plugin('thumbnails', function(options) {
    var div, settings, img, player, progressControl, duration, sceneCount, moveListener, moveCancel;
    settings = options
    player = this;

    (function() {
      var progressControl, addFakeActive, removeFakeActive;
      // Android doesn't support :active and :hover on non-anchor and non-button elements
      // so, we need to fake the :active selector for thumbnails to show up.
      if (navigator.userAgent.toLowerCase().indexOf("android") !== -1) {
        progressControl = player.controlBar.progressControl;

        addFakeActive = function() {
          progressControl.addClass('fake-active');
        };
        removeFakeActive = function() {
          progressControl.removeClass('fake-active');
        };

        progressControl.on('touchstart', addFakeActive);
        progressControl.on('touchend', removeFakeActive);
        progressControl.on('touchcancel', removeFakeActive);
      }
    })();

    // create the thumbnail
    div = document.createElement('div');
    div.className = 'vjs-thumbnail-holder';
    img = document.createElement('img');
    div.appendChild(img);
    sceneCount = 0
    img.onload = function() {
      // change height here || default == 108
      sceneCount = this.height  / 108
    }
    img.src = settings.src;
    img.className = 'vjs-thumbnail';
    extend(img.style, settings.style);

    // keep track of the duration to calculate correct thumbnail to display
    duration = player.duration();
    
    // when the container is MP4
    player.on('durationchange', function(event) {
      duration = player.duration();
    });

    // when the container is HLS
    player.on('loadedmetadata', function(event) {
      duration = player.duration();
    });

    // add the thumbnail to the player
    progressControl = player.controlBar.progressControl;
    progressControl.el().appendChild(div);

    moveListener = function(event) {
      var mouseTime, time, active, left, pageX, right, width, halfWidth, pageXOffset, clientRect;
      active = 0;
      pageXOffset = getScrollOffset().x;
      clientRect = offsetParent(progressControl.el()).getBoundingClientRect();
      right = (clientRect.width || clientRect.right) + pageXOffset;

      pageX = event.pageX;
      if (event.changedTouches) {
        pageX = event.changedTouches[0].pageX;
      }

      // find the page offset of the mouse
      left = pageX || (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
      // subtract the page offset of the positioned offset parent
      left -= offsetParent(progressControl.el()).getBoundingClientRect().left + pageXOffset;

      // apply updated styles to the thumbnail if necessary
      // mouseTime is the position of the mouse along the progress control bar
      // `left` applies to the mouse position relative to the player so we need
      // to remove the progress control's left offset to know the mouse position
      // relative to the progress control
      mouseTime = Math.floor((left - progressControl.el().offsetLeft) / progressControl.width() * duration);
      // get active scene
      time = duration / sceneCount
      active = Math.round( mouseTime / time )
      img.style.top = `${active  * -108}px`

      width = getVisibleWidth(img, settings.width || 192);
      halfWidth = width / 2;

      // make sure that the thumbnail doesn't fall off the right side of the left side of the player
      if ( (left + halfWidth) > right ) {
        left -= (left + halfWidth) - right;
      } else if (left < halfWidth) {
        left = halfWidth;
      }

      div.style.left = left - halfWidth + 'px';
    };

    // update the thumbnail while hovering
    progressControl.on('mousemove', moveListener);
    progressControl.on('touchmove', moveListener);

    moveCancel = function(event) {
      div.style.left = '-1000px';
    };

    // move the placeholder out of the way when not hovering
    progressControl.on('mouseout', moveCancel);
    progressControl.on('touchcancel', moveCancel);
    progressControl.on('touchend', moveCancel);
    player.on('userinactive', moveCancel);
  });
};