import { Transform, Vector3 } from "UnityEngine";
import { ScrollRect } from "UnityEngine.UI";
import ZTweenComponent from "./ZTweenComponent";
export default class ZTween {
    static instance: ZTweenComponent;
    private static initialized;
    static Init(): void;
    private static InitCheck;
    static To(getter: any, setter: any, endValue: any, duration: number): import("./ZTweener").default;
    static TransfomMoveTo(transform: Transform, endValue: Vector3, duration: number): import("./ZTweener").default;
    static TransfomLocalMoveTo(transform: Transform, endValue: Vector3, duration: number): import("./ZTweener").default;
    static ScrollRectHorizontalNormalizedPositionTo(scrollRect: ScrollRect, endValue: number, duration: number): import("./ZTweener").default;
    static ScrollRectVerticalNormalizedPositionTo(scrollRect: ScrollRect, endValue: number, duration: number): import("./ZTweener").default;
}
