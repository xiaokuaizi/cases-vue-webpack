<template>
  <div id="app">
    <h1>{{ msg }}</h1>

    {{$data.msg}}
    <br />
    {{this.$data.msg}}
    {{this}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'This is a test case'
    }
  },
  mounted(){
    console.log(this.$data.msg)
    console.log(this)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
