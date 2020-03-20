<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      dense
      dark
    >
      <!-- drawer -->
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <!-- title -->
      <v-toolbar-title class="hidden-sm-and-down">
        <NuxtLink to="/" class="nav-link">
          Connective Learning
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer />
      <!-- search -->
      <SearchBox />
      <v-spacer />

      <!-- login -->
      <v-btn v-if="!isLogin" to="login">
        {{ $t('button.login') }}
      </v-btn>
      <v-menu
        v-else
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            {{ user.username }}
            <v-avatar>
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in userItem"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <!-- locale select -->
      <v-select
        v-model="en1"
        class="locale-selector"
        :items="countries"
        menu-props="auto"
        hide-details
        label="Select"
        single-line
        @change="localeChange"
      />
    </v-app-bar>
    <n-child />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBox from '~/components/main/SearchBox'
export default {
  components: {
    SearchBox
  },
  data: () => ({
    countries: ['en', 'ja', 'th'],
    drawer: false,
    items: [
      { text: 'upload', icon: 'mdi-upload', to: 'upload' },
      { text: 'uploaded list', icon: 'mdi-file-table', to: 'uploaded' }
      // { text: 'Logout', icon: 'mdi-logout', to: 'logout' },
    ],
    userItem: [
      { text: 'Logout', icon: 'mdi-logout', to: 'logout' }
    ]
  }),

  computed: {
    ...mapGetters({
      user: 'user/userInfo',
    }),
    isLogin() {
      return this.$store.state.user.isLogin
    },
    en1: {
      get(){return this.$store.state.locale},
      set(value){},
    }
  },
  watch: {
    en1(val) {
      this.$i18n.locale = val
    }
  },

  methods: {
    localeChange(lang) {
      this.$store.commit('SET_LANG', lang)
    },
    toggleDrawer() {
      this.drawer = !this.drawer
      this.leftDrawerWidth = this.drawer ? 160 : 0
      console.log(this.drawer, this.leftDrawerWidth)
    },

    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer
      this.rightDrawerWidth = this.rightDrawer ? 160 : 0
    }
  }
}
</script>

<style>
.button-link a{
  text-decoration: none;
  color: white;
}

.nav-link.nuxt-link-active{
  text-decoration: none;
  color: white;
}
.v-list-item--link{
  text-decoration: none;
  color: white;
}

.locale-selector{
  width: 10px;
}
</style>
