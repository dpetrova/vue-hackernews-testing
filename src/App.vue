<template>
  <div id="app">
    <div id="nav" class="header">
      <router-link to="/top">Top</router-link>
      <router-link to="/new">New</router-link>
      <router-link to="/show">Show</router-link>
      <router-link to="/ask">Ask</router-link>
      <router-link to="/job">Jobs</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
    <div class="view">
      <router-view :key="$route.params.type" />
    </div>
    <div id="footer">
      <span>{{ getCurrentYear }}</span>
    </div>
  </div>
</template>

<script>
//locally registered mixin
import { titleMixin } from './util/mixins.js'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  mixins: [titleMixin],
  computed: {
    title() {
      return `${
        this.$route.params.type
          ? capitalizeFirstLetter(this.$route.params.type)
          : ''
      }`
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: #f2f3f5;
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}
#nav a.router-link-exact-active {
  color: #34495e;
}
a {
  color: #34495e;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
}
li {
  list-style: none;
}
.header {
  background-color: #f60;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.header .inner {
  max-width: 800px;
  box-sizing: border-box;
  margin: 0px auto;
  padding: 15px 5px;
}
.header a {
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  transition: color 0.15s ease;
  display: inline-block;
  vertical-align: middle;
  font-weight: 300;
  letter-spacing: 0.075em;
  margin-right: 1.8em;
}
.header a:hover {
  color: #fff;
}
.header a.router-link-active {
  color: #fff;
  font-weight: 400;
}
.header a:nth-child(6) {
  margin-right: 0;
}
.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#footer {
  background-color: #f60;
  color: white;
  font-weight: bold;
  vertical-align: text-bottom;
  position: fixed;
  z-index: 999;
  height: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
#footer > span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header .inner {
    padding: 15px;
  }
  .header a {
    margin-right: 1em;
  }
}
</style>
