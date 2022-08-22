# v-anime

一种 vue 的动效管理方式（基于 <a href="https://github.com/juliangarnier/anime">anime.js</a>），提供更简单的动效编写。主要对标的是 js 动画，而不是 lottie 之类

###### Features

- 基于配置，简单易用，更加灵活
- 代码可读性更高
- 可以完全独立出来，与主体功能解耦
- 可以对 v-if 类的动画效果提供更好的支持（状态保留）

<br>

<br>

## Installation

```bash
npm i vanime -D
```

## 一点建议

我个人的经验是，动效的部分如果不能从主体功能中轻松的除去，那么此时的动效部分已经产生了非常不好的影响

附：命名空间的效果主要依赖于路由，所以项目必须要有 vue-router。进入某路由时，注入动画信息并生成控制器，在其子路由中仍可用，当退出时，销毁这些

## 关于 v-if

注意，在使用 v-if 的时候，如果快速更改其绑定的值（如反复点击按钮），会导致动画不能顺利完成，比如，一个方块 5s 内右移 500px 从而消失，然后再从 500px 的位置出现并回到原位置，那么当你在 1s 的时候再次更改 v-if 的值，方块右移了 100px 直接就消失，然后从 500px 的位置出现并返回到 0 的位置

这是不符合直感的，在 100px 结束却在 500px 的位置返回，（因为 vue 会强制动画结束，开发者其实并不能人为控制动画，除非同时控制 vif 绑定的值（防抖之类的），（更糟糕的是，这会导致某些动画库的定时器泄露并对下一次动画产生影响！），且 dom 会销毁，那么此时的状态（100px)就消失掉了，就好像使用 ae 或者 an 制作动画时中间一部分动画帧消失，导致一个长跑运动员直接从起点“瞬移”到了终点（vue 的 transition 官方实例中如果反复点击按钮就会看到类似的效果）。

v-anime 可以有效地帮你解决这个问题，当 dom 销毁时它会记住状态，并让 dom 重新出现时自适应一个符合直感的动画效果

如果你确实需要一个死板的效果，比如 dom 每次出现在相同的地方，那么你并不需要使用 v-anime

## basic concept

v-anime 中这样区分动效，1,某个事件触发（一系列）dom 变化，（与框架无关，不受 vue 影响）,2,v-if/v-show 导致的被 transition 包裹的动画效果（受 vue 控制）

```JS
let animeData = {
    //第一类，触发open事件导致名为block1，block2的dom变化
      open: {
    block1: {//属性与animejs完全一致
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
   //第二类 受框架控制
   //当进入动画和离开动画相同时，使用both
  both: {
    block3: {
      translateX: [0, 100],//最好此时以数组的格式
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
   //当进入动画和离开动画不同时且初始v-if为false时，使用init提供初始状态
  init:{
    block6:"opacity:0"//csstext
  },
     //当进入动画和离开动画不同时，使用enter/left

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

在模板中

```html
<!-- 第一类 -->
<div block1></div>
...
<!-- 第二类 -->
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

在 js 中控制

```js
initAnime(animeData);
//第一类
const instance = transition("open"); //触发open事件，返回anime实例，你要做的就是在你需要这个动效的时候，调用它
```

更多的方法可以在 anime.ts 中看到

第二类无需手动控制，由框架处理

## 更加简单的写法

如果你觉得写一大堆 transition 非常麻烦，又恰巧使用 vite 进行开发，可以使用<a href="https://github.com/fgsreally/vite-plugin-template-parser">vite-plugin-template-parser</a>

```js
import { parser } from "vite-template-parser";
import { parseHelper } from "v-anime";
export default defineConfig({
  plugins: [vue(), parser(parseHelper)],
});
```

那么就可以使用更加优雅的方法！

```html
<div v-if="x" anime="block4"></div>
```

封装一个组件也是可行的
