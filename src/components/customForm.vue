<template>
    <form 
      id="app"
      v-on:submit="checkForm"
      action="/action"
      method="POST"
    >
      <input
        class="username"
        id="sign-in-username"
        type="text"
        placeholder="请输入用户名"
        name="username"
        required="true"
        pattern="^\S{6,18}$"
        title="请输入6~18位用户名（不能包含空格）"
        v-model="username"
        v-on:blur="checkUsername(formFunction)"
        v-on:focus="focus($event)"
        v-on:input="input($event)"
        v-focus="usernameFocus"
      />
      <div
        v-if="this.formFunction==='signUp'"
        class="exInfo"
      >
        <span>{{ this.nameError }}</span>
      </div>
      <input
        v-if="this.formFunction==='signIn'"
        class="password"
        id="sign-in-password"
        type="password"
        placeholder="请输入密码"
        name="password"
        required="true"
        v-model="password"
        v-focus="passwordFocus"
        v-on:focus="focus($event)"
        v-on:input="input($event)"
      />
      <input
        v-else
        class="password"
        id="sign-up-password"
        type="password"
        placeholder="请输入密码"
        name="password"
        required="true"
        v-model="password"
        v-on:blur="checkPassword($event)"
        v-on:focus="focus($event)"
        v-on:input="input($event)"
      />
      <input
        v-if="this.formFunction=='signUp'"
        id="repeat-password"
        type="password"
        placeholder="请再次输入密码"
        name="repeat-password"
        required="true"
        v-model="repeatPassword"
        v-on:blur="checkPassword($event)"
        v-on:focus="focus($event)"
        v-on:input="input($event)"
      />
      <div class="exInfo"
        v-show="this.formFunction=='signIn'"
      >
        <span>{{ this.error }}</span>
        <div>
        <input
          id="autoLog"
          type="checkbox"
          name="autoLog"
          value="false"
          v-model="remember"
        />
        <label for="autoLog">自动登录</label>
        </div>
      </div>
      <p 
        v-show="this.formFunction==='signUp'"
        class="exInfo"
        id="sign-up-exInfo"
      >
       {{ this.error }}
      </p>
      <input
        v-bind:class="{'submit-ban': ban}"
        class="submit"
        v-bind:value="this.formFunction=='signIn' ? '登录' : '注册并登录'"
        type="submit"
        v-button="ban"
      />
    </form>
</template>

<script>
import Mock from 'mockjs'

export default {
    props:
    {
        formFunction: {
          type: String,
          required: true
        } 
    },
    data()
    {
        return {
            username: null,
            password: null,
            repeatPassword: null,
            remember: true,
            usernameFocus: false,
            passwordFocus: false,
            error: '',
            nameError:'',
            userList: [{
              username: 'qqqqqq',
              password: '111111',
            },
            {
              username: 'wwwwww',
              password: '222222',
            },
            {
              username: 'sepveneto',
              password: '123456',
            }],
        }
    },
    methods:
    {
        checkForm(e)
        {
            let userInfo = {
                action: this.formFunction,
                username: this.username,
                password: this.password,
                remember: this.remember,
                },
                errorCode = {
                  '-1': ()=>this.error= '用户名不存在',
                  '-2': ()=>this.error= '密码不正确',
                }
            /********************************************************/
            /*                数据模拟                               */
            /********************************************************/
            let data = Mock.mock('/log', 'post', ({body})=>{
              let userInfo = JSON.parse(body);
              if(userInfo.action === 'signUp')
              {
                this.userList.push({
                  username: userInfo.username,
                  password: userInfo.pssword,
                });
                return '1';
              }
              for(let items of this.userList)
              {
                if(userInfo.username === items.username)
                {
                  if(userInfo.password === items.password)
                  {
                    return '1';
                  }
                  else
                  {
                    return "-2";
                  }
                }
              }
              return '-1';
            })
            /********************************************************/
            /*                   END                                */
            /********************************************************/
            this.axios.post('/log', userInfo)
              .then(response=>{
                switch( response.data )
                {
                  case '1':
                    this.$router.push('/home');
                    this.GLOBAL.username = userInfo.username;
                    console.log('success');
                    return true;
                  case '-1':
                    this.usernameFocus = true;
                    break;
                  case '-2':
                    this.passwordFocus = true;
                    break;
                }
                errorCode[response.data]();
              })
              .catch(error=>{
                console.log(error);
              });
            e.preventDefault();
        },
        checkUsername(action)
        {
          if(action === 'signIn')
          {
            return;
          }
          /********************************************************/
          /*                数据模拟                               */
          /********************************************************/
          /*Mock.mock('/log', 'post', ({body})=>{
            let request = JSON.parse(body);
            for(let items of this.userList)
            {
              if(request.username === items.username)
              {
                return '-3';
              }
            }
            return '1';
          });*/
          /********************************************************/
          /*                   END                                */
          /********************************************************/
          this.axios.post('/log', {
            action: 'check',
            username: this.username,
          })
          .then(response=>{
            if(response.data !== '1')
            {
              this.nameError = '用户名已被注册';
            }
          })
          .catch(error=>{
            console.log(error);
          });
        },
        checkPassword(event)
        {
          if(!this.password || !this.repeatPassword)
          {
            return;
          }
          if(this.password !== this.repeatPassword)
          {
            this.error = '两次输入的密码不一致';
          }
        },
        focus(event)
        {
          this.usernameFocus = false;
          this.passwordFocus = false;
          event.target.select();
        },
        input(event)
        {
          this.error = '';
          this.nameError = '';
        }
    },
    computed:
    {
      ban()
      {
        return this.error !== ''
      }
    },
    directives: {
      focus: {
        update(el, {value}) {
          if(value)
          {
            el.focus();
            el.select();
          }
        }
      },
      button: {
        update(el, {value}) {
          el.disabled = value;
        }
      }
    }
}
</script>

<style scoped>
.info
{
  color: red;
  margin: 4px 0;
}
#app
{
    display: flex;
    position: relative;
    flex-flow: column;
    justify-content: center;
    padding: 0 30px;
}
#app::after
{
  content: '';
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.username, .password, #repeat-password
{
    width: 300px;
    height: 34px;
    font-size: 1.2em;
    border-radius: 6px;
    margin-top: 40px;
    padding-left: 10px;
}
#sign-up-password
{
  margin-top: 0;
}
input:required
{
  box-shadow: none;
}
input[required]:focus
{
  box-shadow: 0 0 6px blue;
}
.submit
{
    height: 40px;
    margin-bottom: 20px;
    font-size: 1.3em;
    background-color: red;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
}
.submit:hover
{
  background-color: #ed0000;
}
.submit-ban
{
  background-color: gray;
  cursor:not-allowed;
}
.submit-ban:hover
{
  background-color: gray;
}

.exInfo
{
  margin: 10px 0;
  height: 21px;
  display: flex;
  justify-content: space-between;
}
.exInfo>span, #sign-up-exInfo
{
  color: red;
}
</style>
