import type { AnimeParams, AnimeTimelineInstance } from "animejs";

export interface AnimeSet {
  [key: string]: AnimePageInfo;
}
export interface AnimePageInfo {
  [key: string]: ActionInfo;
}
export interface ActionInfo {
  [key: string]: AnimeParams;
}
export interface ControllerInfo {
  [key: string]: AnimeTimelineInstance;
}

export interface StateInfo {
  [key: string]: ActionInfo | any;
}
// enum SpecialState {
//   enter,
//   leave,
// }
