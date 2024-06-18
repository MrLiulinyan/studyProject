<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

interface userInfo {
  name:string;
  age:number,
  height:number,
  readonly genger?:string
}

@Options({
  components: {
    HelloWorld,
  },
  created():void {
    const sum = (param1:number,param2:number):number=>{
      return param1+param2
    } 
  },
  mounted(): void {
    const name:string = 'n'
    const user:userInfo = {
      name:"张三",
      age:18,
      height:160,
      genger:'男'
    }
    console.log(user)
  },
  methods:{

  }
})

export default class Home extends Vue {}
</script>
