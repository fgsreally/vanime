import anime from "animejs";
import { onMounted, onUnmounted } from "vue";
import type { App } from "vue";

import type {
  AnimePageInfo,
  AnimeSet,
  ControllerInfo,
  StateInfo,
} from "./types";
import type {
  AnimeTimelineInstance,
  AnimeParams,
  AnimeInstance,
} from "animejs";

const dataSet: AnimeSet = {};
const controllerSet: ControllerInfo = {};
const vController: StateInfo = {
  enter: {},
  leave: {},
  both: {},
  state: {},
  init: {},
};
let vActionName: Set<string> = new Set();
export function initAnime(animeInfo: AnimePageInfo, key: string = "_all") {
  if (!dataSet[key]) dataSet[key] = animeInfo;
  for (let actionName in animeInfo) {
    if (controllerSet[actionName])
      console.warn(
        ` There are more than one Anime action named {{--${actionName}--}},which may be overrides and missed`
      );
    vActionName.add(actionName);
    if (["enter", "leave", "both", "init"].includes(actionName)) {
      for (let el in animeInfo[actionName]) {
        vController.state[el] = {
          type: actionName === "both" ? "both" : "single",
        };

        vController[actionName][el] = animeInfo[actionName][el];
        onUnmounted(() => {
          vActionName.delete(actionName);
          vController[actionName][el] = undefined;
          vController.state[el] = undefined;
        });
      }
    } else {
      controllerSet[actionName] = anime.timeline({
        autoplay: false,
        ...animeInfo[actionName]?.basic,
      });
      onMounted(() => {
        for (let el in animeInfo[actionName]) {
          if (el !== "basic") {
            controllerSet[actionName].add(
              {
                targets: /^(#|\.)/.test(el) ? el : `[${el}]`,
                ...animeInfo[actionName][el],
              },
              0
            );
          }
        }
      });
    }
  }

  onUnmounted(() => {
    for (let actionName in animeInfo) {
      (controllerSet as any)[actionName] = undefined;
      (dataSet as any)[key] = undefined;
    }
  });
}
export function useData(): AnimeSet {
  return dataSet;
}
export function useController(
  name?: string
): ControllerInfo | AnimeTimelineInstance {
  if (name) return controllerSet[name];
  return controllerSet;
}

export function transition(name: string): AnimeTimelineInstance {
  controllerSet[name].play();
  return controllerSet[name];
}

export function appear(
  name: string,
  cb: (anime: AnimeTimelineInstance) => {}
): void {
  onMounted(() => {
    controllerSet[name].play();
    cb(controllerSet[name]);
  });
}
export function reverse(instance: AnimeTimelineInstance): void {
  instance.reverse();
  instance.play();
  instance.finished.then(() => {
    instance.reverse();
  });
}
export function transitionAsync(name: string): Promise<void> {
  controllerSet[name].play();
  return controllerSet[name].finished;
}

export function addAnime(
  el: string | HTMLElement,
  name: string,
  property: AnimeParams
): AnimeTimelineInstance {
  return controllerSet[name].add(
    {
      targets: el,
      ...property,
    },
    0
  );
}

function getKey(el: HTMLElement): string {
  return el.getAttribute("anime") as string;
}
function initAnimeInstance(el: HTMLElement, key: string, type: string) {
  let controller;
  if ((el as any)._anime) {
    controller = (el as any)._anime;
    if (type === "enter") controller.reverse();
  } else {
    controller = anime({
      //Only when initial element leave for the first time or when a new element is created
      ...vController.both[key],
      targets: el,
      autoplay: false,
    });
    if (vController.state[key].progress) {
      controller.seek(
        (controller.duration * vController.state[key].progress) / 100
      );
    } else {
      if (type === "leave") controller.seek(controller.duration);
      //Only when initial element leave or enter for the first time
    }
  }
  return controller;
}
export function enterBefore(el: HTMLElement) {
  const key = getKey(el);
  if (!key) {
    console.warn("missing anime key");
    return;
  }

  if (vController.state[key].cssText && !(el as any).style.cssText) {
    el.style.cssText = vController.state[key].cssText;
  }
  if (!(el as any).style.cssText && vController.init[key]) {
    el.style.cssText = vController.init[key];
  }
}

export function enter(el: HTMLElement, done: any) {
  const key = getKey(el);
  if (!key) {
    console.warn("missing anime key");
    return;
  }
  try {
    let controller;

    if (vController.state[key].type === "both") {
      controller = initAnimeInstance(el, key, "enter");
    } else {
      controller = anime({
        ...vController.enter[key],
        targets: el,
        autoplay: false,
      });
    }
    controller.finished.then(done);
    controller.index = el.dataset.index;
    (el as any)._anime = controller;
    controller.play();
  } catch (e) {
    console.error("(most probably) missing animeInfo type 'enter' or 'both'");
    console.error(e);
  }
}

export function enterCancel(el: HTMLElement) {
  (el as any)._anime.pause();
}

export function leave(el: HTMLElement, done: any) {
  const key = getKey(el);
  if (!key) {
    console.warn("missing anime key");
    return;
  }
  try {
    let controller;
    if (vController.state[key].type === "both") {
      controller = initAnimeInstance(el, key, "leave");
      controller.reverse();
    } else {
      controller = anime({
        ...vController.leave[key],
        targets: el,
        autoplay: false,
      });
    }
    controller.index = el.dataset.index;
    controller.finished.then(done);
    controller.play();
    (el as any)._anime = controller;
  } catch (e) {
    console.error("(most probably) missing animeInfo type 'leave' or 'both'");
    console.error(e);
  }
}

export function leaveAfter(el: HTMLElement) {
  const key = getKey(el);

  if (vController.state[key].type === "both") {
    (el as any)._anime.pause();
    vController.state[key].progress = (el as any)._anime.progress;
  }
  vController.state[key].cssText = el.style.cssText;
}
export function leaveCancel(el: HTMLElement) {
  leaveAfter(el);
  (el as any)._anime = undefined;
}
export let vanime = {
  install: (app: App) => {
    app.config.globalProperties.$enterBefore = enterBefore;
    app.config.globalProperties.$leaveAfter = leaveAfter;
    app.config.globalProperties.$enterCancel = enterCancel;
    app.config.globalProperties.$enter = enter;
    app.config.globalProperties.$leave = leave;
    app.config.globalProperties.$leaveCancel = leaveCancel;
  },
};
