let animeData = {
  both: {
    block3: {
      translateX: [0, 100],
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
  init:{
    block6:"opacity:0"
  },
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
  open: {
    block1: {
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
};

export default animeData;
