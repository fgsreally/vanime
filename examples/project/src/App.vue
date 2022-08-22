<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { initAnime, transition, useController } from "@fgsreally/vanime";
import { ref, onMounted } from "vue";
import animeData from "./data";
initAnime(animeData);
let computedList = ref([
  { msg: "Bruce Lee" },
  { msg: "Jackie Chan" },
  { msg: "Chuck Norris" },
  { msg: "Jet Li" },
  { msg: "Kung Fury" },
]);
onMounted(() => {
  console.log(useController());
});
let curTransition;
let block3 = ref(false);
let block4 = ref(true);
let block5 = ref(true);
let block6 = ref(false);
let block9 = ref(false);
let block10 = ref(true);

function test1() {
  curTransition = transition("open");
  console.log(curTransition);
}
function test2() {
  if (!curTransition) return;
  console.log(curTransition);
  curTransition.reverse();
  curTransition.play();
}
function test3() {
  block3.value = !block3.value;
}
function test4() {
  block4.value = !block4.value;
}
function test5() {
  block5.value = !block5.value;
}
function test6() {
  block6.value = !block6.value;
}
function test7() {
  computedList.value.push({ msg: "newOne" });
}
function test8() {
  computedList.value.pop();
}
function test9() {
  block9.value = !block9.value;
}
function test10() {
  block10.value = !block10.value;
}
</script>

<template>
  <section class="all">
    <section class="box">
      <button @click="test1" btn1>左移</button>
      <button @click="test2" btn2>右移</button>
      <div block1 class="block" style="background-color: blue"></div>
      <div block2 class="block"></div>
    </section>
    <section class="box">
      <button @click="test3" btn3>从无到有</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-if="block3" anime="block3" class="block"></div>
      </transition>
    </section>
    <section class="box">
      <button @click="test4" btn4>从有到无</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-if="block4" anime="block4" class="block"></div>
      </transition>
    </section>
    <section class="box">
      <button @click="test5" btn5>进出不同</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-if="block5" anime="block5" class="block"></div>
      </transition>
    </section>
    <section class="box">
      <button @click="test6" btn6>进出不同</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-if="block6" anime="block6" class="block"></div>
      </transition>
    </section>
    <section class="box">
      <button @click="test7" btn7>增加</button>
      <button @click="test8" btn8>弹出</button>
      <TransitionGroup
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <li
          v-for="(item, index) in computedList"
          :key="item.msg"
          :data-index="index"
          anime="block7"
        >
          {{ item.msg }}
        </li>
      </TransitionGroup>
    </section>
    <section class="box">
      <button @click="test9" btn9>从无到有</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-show="block9" anime="block9" class="block"></div>
      </transition>
    </section>
    <section class="box">
      <button @click="test10" btn10>从无到有</button>
      <transition
        :css="false"
        @before-enter="$enterBefore"
        @enter="$enter"
        @leave="$leave"
        @after-leave="$leaveAfter"
        @enter-cancelled="$enterCancel"
        @leave-cancelled="$leaveCancel"
      >
        <div v-show="block10" anime="block10" class="block"></div>
      </transition>
    </section>
  </section>
</template>

<style>
.box,
.all {
  display: flex;
  justify-content: center;
  align-items: center;
}
.all {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}
.block {
  width: 100px;
  height: 100px;
  margin: 30px auto;
  background-color: red;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
