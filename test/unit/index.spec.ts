import { test, expect } from "vitest";
import { initAnime, useData, useController } from "../../src";

let animeData = {
  both: {
    block1: {
      translateX: 270,
      delay: 1000,
    },
  },
  open: {
    basic: { autoplay: true },
    block1: {
      translateX: 270,
      delay: 1000,
    },
    block2: {
      translateY: 270,
      delay: 1000,
    },
  },
};
initAnime(animeData);

test("animeData inject", () => {
  const data = useData();
  expect(data._all.open.block1.translateX).toBe(270);
});

test("timeLine build", () => {
  const controller = useController();
  expect(controller["open"].autoplay).toBe(true);
});
