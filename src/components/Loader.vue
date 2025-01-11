<template>
<div class="center">
  <div class="ring"></div>
  <span>Loading...</span>
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/vars';
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0, .5);
    width: 100%;
    height: 100%;
}

.center{
  display:flex;
  text-align:center;
  justify-content:center;
  align-items:center;
  min-height:100vh;
 }
.ring{
  position:absolute;
  width:200px;
  height:200px;
  border-radius:50%;
  animation:ring 2s linear infinite;
  }
@keyframes ring{
  0%{
    transform:rotate(0deg);
    box-shadow:1px 5px 2px #e65c00;
    }
  50%{
    transform:rotate(180deg);

    box-shadow:1px 5px 2px #18b201;
    }
  100%{
    transform:rotate(360deg);
    box-shadow:1px 5px 2px #0456c8;
    }
 } 
.ring:before{
  position:absolute;
  content:'';
  top:0;
  left:0;
  width:100%;
  height:100%;
  border-radius:50%;
  box-shadow:0px 0px 5px rgba(255,255,255,0.3);
  }
span{
  color:#737373;
  font-size:20px;
  text-transform:uppercase;
  letter-spacing:3px;
  line-height:200px;
  animation:text 2s linear infinite;
 } 
@keyframes text{
  0%{
    color:#e65c00;
    }
  50%{
    color:#18b201;
    }
  100%{
    color:#0456c8;
    }
 } 
</style>