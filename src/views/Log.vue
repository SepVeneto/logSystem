<template>
<div id="content">
  <div id="user-content" v-bind:class="{ 'rotate-card': isRotate }">
    <div id="user-signIn">
      <header class="form-header">用户登录</header>
      <customForm formFunction="signIn"></customForm>
      <div class="tips">
        还没有账号？
        <a class="action-entry" href=""
          v-on:click="changeMode">立即注册</a>
      </div>
    </div>
    <div id="user-signUp">
      <header class="form-header">用户注册</header>
      <customForm formFunction="signUp"></customForm>
      <div class="tips">
        已经有账号了？
        <a class="action-entry" href=""
         v-on:click="changeMode">立即登录</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Input from '@/components/Input.vue'
import customForm from '@/components/customForm.vue'
export default {
  components:
  {
    Input,
    customForm
  },
  data()
  {
    return{
      isRotate: false
    }
  },
  methods:
  {
    changeMode(e)
    {
      e.preventDefault();
      this.isRotate = !this.isRotate;
    },
    clickSubmit(e)
    {
      //e.preventDefault();
      console.log('click')
    }
  }
}
</script>


<style>
  div
  {
    margin: 0;
  }
  #content
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #user-content
  {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 417px; 
    transition: all 1s;
    transform-style: preserve-3d;
  }
  .rotate-card
  {
    transform: rotateY(180deg);
  }
  #user-login-form
  {
    backface-visibility: hidden;
  }
  #user-signIn, #user-signUp
  {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    border: 1px solid black;
    background-color: #fff;
    padding: 20px;
    backface-visibility: hidden;
    border-radius: 6px;
    box-shadow: 0 0 10px;
  }
  #user-signIn
  {
    z-index: 10;
    transform: rotateY(0deg);
  }
  #user-signUp
  {
    z-index: 5;
    transform: rotateY(180deg);
  }
  /******************************/
  /*           form             */
  /******************************/
  .action-entry
  {
    text-decoration: none;
  }
  .action-entry:visited
  {
    color: rgb(0, 0, 238);
  }
  .form-header
  {
    font-size: 1.5em;
  }
</style>
