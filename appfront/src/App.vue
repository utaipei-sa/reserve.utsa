<template>
  <v-app>
    <v-app-bar color="rgba(23, 18 ,127 ,1)" density="compact">
      <v-app-bar-nav-icon href="#/">
        <v-img  src="@/assets/cat.png" alt="Ut" />
      </v-app-bar-nav-icon>
      <!-- <v-btn variant="text" href="#/signin">signin</v-btn>
      <v-btn variant="text" href="#/signout">signout</v-btn> -->
      <v-btn variant="text" href="#/form">form</v-btn>
      <v-btn variant="text" href="#/timetable">timetable</v-btn>
    </v-app-bar> 
    <v-main>
      <v-container fluid>
        <component class="comp" :is="currentView" />
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script >
import Home from './components/Home.vue'
import Signin from './components/Signin.vue'
import Signout from './components/Signout.vue'
import Form from './components/Form.vue'
import Timetable from './components/Timetable.vue'
//import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/signin': Signin,
  '/signout' : Signout,
  '/form': Form,
  '/timetable' :Timetable
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },    
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>
<style>

.v-row{
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto
}
.v-col{
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%
}
.v-spacer{
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%
}
.v-input__details {
    display: none;
} 
</style>