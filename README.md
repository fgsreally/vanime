# vanime

A anime management method for vue (base on <a href="https://github.com/juliangarnier/anime">anime.js</a>),

###### Features

- Based on configuration, more flexible
- more readable
- can be completely independent from the main function
- Better support for v-if/v-for animation (state preservation)

<br>

<br>

## Installation

```bash
npm i vanime -D
```

## basic concept

In vanime, animation are distinguished as follows: 1. Dom changes triggered by an event ( not affected by vue); 2. Animation effects wrapped by transition caused by vif/vshow (controlled by vue)

```JS
let animeData = {
    //first kind
    //Firing the open event causes the DOM named block1, block2 to change
      open: {
    block1: {//Property is the same as animejs
      duration: 1000,
      translateX: 100,
      opacity: 0.5,
    },
    block2: {
      duration: 1000,
      translateX: 100,
      opacity: 0.5,
    },
  },
   //The second kind(controlled by vue)
   //When (enter)animation is the same as (leaving) animation ,use "both"
  both: {
    block3: {
      translateX: [0, 100],//array may be better
      opacity: [0, 1],
      duration: 2000,
      easing: "linear",
    },
    block4: {
      translateX: [0, 100],
      opacity: [0, 1],
      duration: 2000,
      easing: "linear",
    },
    block7: {
      translateX: [0, 100],
      opacity: [0, 1],
      delay: function (el) {
        return el.dataset.index;
      },
    },
    block9: {
      translateX: [0, 100],
      opacity: [0, 1],
      duration: 2000,
      easing: "linear",
    },
    block10: {
      translateX: [0, 100],
      opacity: [0, 1],
      duration: 2000,
      easing: "linear",
    },
  },
   //When (enter/leave) animation are different and the initial Vif/vfor binding is false, use init to provide the initial state
  init:{
    block6:"opacity:0"//csstext
  },
     //when (enter/leave) animation are different,use "enter/left"

  enter: {
    block5: {
      translateY: 100,
      opacity: 1,
      duration: 2000,
      easing: "linear",
    },
    block6: { translateY: 100, opacity: 1, duration: 2000, easing: "linear" },
  },
  leave: {
    block5: {
      translateY: -100,
      opacity: 0,
      duration: 2000,
      easing: "linear",
    },
    block6: { translateY: 0, opacity: 0, duration: 2000, easing: "linear" },
  },

};

export default animeData;

```

in template

```html
<!-- fisrt kind -->
<div block1></div>
...
<!-- second kind -->
<transition
  :css="false"
  @before-enter="$enterBefore"
  @enter="$enter"
  @leave="$leave"
  @after-leave="$leaveAfter"
  @enter-cancelled="$enterCancel"
  @leave-cancelled="$leaveCancel"
>
  <!--or transition-group -->
  <div v-if="x" anime="block4"></div>
</transition>
```

control it in js

```js
initAnime(animeData);
//first kind
const instance = transition("open"); //fire the open event and return the anime instance
```
more control functions are in **anime.ts**

The second one is handled by the framework (not manual)

## easy way

If you find it hard to write a bunch of transitions tag and develop with Vite, <a href="https://github.com/fgsreally/vite-plugin-template-parser">vite-plugin-template-parser</a> may be helpful

```js
import { parser } from "vite-template-parser";
import { parseHelper } from "vanime";
export default defineConfig({
  plugins: [vue(), parser(parseHelper)],
});
```

Then you can use a more elegant method!

```html
<div v-if="x" anime="block4"></div>
```

Wrapping a component is also good

## suggest

My personal experience is that if the dynamic part cannot be easily removed from the main function, then the dynamic part has produced a very bad effect

Note: The effect of namespaces depends on routing, so the project must have a vue-Router. When entering a route, inject animation information and generate controllers, which are still available in its subroutes, destroy these when exiting

## about vue (vif/vfor)

Note that when using v-if/v-for, changing the binding value quickly (like clicking the button repeatedly) will cause the animation to fail. For example, a block will disappear by moving 500px to the right within 5 seconds, then reappear from 500px and return to its original position. Then when you change the value of V-if again after 1s, the block moves 100px to the right and disappears, then comes back from 500px and returns to 0

It doesn't make sense to end at 100px and return at 500px (because vue forces the animation to end, developers can't actually control the animation unless they also control the vif binding value (even worse, This will cause some animation library timers to leak and affect the next animation) ", and the DOM will be destroyed, then the state (100px) will disappear, just like the middle part of the animation frame disappears when using AE or AN animation, Causes a long-distance runner to "teleport" directly from the start to the finish line (vue's official example behave a similar effect if you click the button repeatedly).

vanime can effectively solve this problem for you by remembering the state when the DOM is destroyed and making the DOM reappear with a straight forward animation

If you really need a rigid effect, such as DOM appearing in the same place each time, then you don't need to use VanIME
