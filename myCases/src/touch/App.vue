<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div id="wrapper" ref="wrapper">
      <div id="logger" ref="logger"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'This is a case about touch',
      startX: 0,
      startY: 0,
      delTaX: 0,
      delTaY: 0,
      isCanMove: false,
      direction: 0,
      maxWidth: 148
    }
  },
  methods:{
    touch(event){
      var $logger = this.$refs.logger;
      var event = event || window.event;  
      var point = event.touches ? event.touches[0] : event;

      if(!this.isCanMove){
        return;
      }
      switch(event.type){  
          case "touchstart":  
              this.startX = point.pageX;
              this.startY = point.pageY;
              break;  
          case "touchend":  
            
            if(this.delTaX >=  this.maxWidth/2){
          this.delTaX = this.maxWidth;
          this.direction = 1;
        }else{
          this.delTaX = 0;
          this.direction = 0;
        }
        

        $logger.style.left = this.delTaX + "px";
        this.isCanMove = false;
              break;  
          case "touchmove":  
            this.delTaX = Math.ceil(point.pageX - this.startX);
        this.delTaY = point.pageY - this.startY;

        if(this.direction == 0){
          this.delTaX =  this.delTaX;
        }else{
          this.delTaX =  this.maxWidth + this.delTaX;
        }

        if(this.delTaX >= this.maxWidth){
          this.delTaX = this.maxWidth;
        }
        if(this.delTaX <= 0){
          this.delTaX = 0;
        }
        

        $logger.style.left =  this.delTaX + "px";

              event.preventDefault();  
              break;  
      }  
    },
    subtouch(event){
      var event = event || window.event;
      switch(event.type){  
          case "touchstart":  
              this.isCanMove = true;
              break;  
          case "touchend":  
          
              break;  
          case "touchmove":  
            
            break; 
      }
    }
  },
  mounted(){
    
    var $wrapper = this.$refs.wrapper,
	      $logger = this.$refs.logger;
        
      $wrapper.addEventListener('touchstart',this.touch, false);  
	    $wrapper.addEventListener('touchmove',this.touch, false);  
	    $wrapper.addEventListener('touchend',this.touch, false);

	    $logger.addEventListener('touchstart',this.subtouch,false);  
	    $logger.addEventListener('touchmove',this.subtouch, false);  
	    $logger.addEventListener('touchend',this.subtouch, false);
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

#wrapper{width:200px;border:1px solid #000000; border-radius: 52px;height:52px;margin:100px auto;background: blue;position: relative;}
#logger{height:50px;line-height: 50px;width:50px;background: #fff;border:1px solid #000000;border-radius: 50px;position: absolute;left:0;top:0;}

</style>
