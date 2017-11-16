import Vue from 'vue'
import Hello from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function dynamicPropsFn () {
  const now = new Date()
  return {
    name: (now.getFullYear())+'!'
  }
}

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/index', component: Hello, name:'index', alias: '/', props: true}, // No props, no nothing
    { path: '/hello', component: Hello, name: 'hello', props: { name: 'all' } }, // Pass route.params to props
    { path: '/static', component: Hello, name:'static', props: { name: 'static' }}, // static values
    { path: '/dynamic', component: Hello, name: 'dynamic', props: dynamicPropsFn }, // custom logic for mapping between route and props
    { path: '/attrs', component: Hello, name: 'attrs', props: { name: 'attrs' }}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/index">/</router-link></li>
        <li><router-link to="/hello">/hello</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic">/dynamic</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
}).$mount('#app')
