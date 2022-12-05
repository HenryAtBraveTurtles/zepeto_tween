import { Color, Material, Transform, Vector3 } from "UnityEngine";
import { Image, ScrollRect } from "UnityEngine.UI";
import ZTweenComponent from "./ZTweenComponent";
import ZTweenManager from "./ZTweenManager";

export default class ZTween {
    public static instance: ZTweenComponent = null;
    private static initialized: boolean = false;

    public static Init() {
        if (ZTween.initialized) return;

        ZTween.initialized = true;
        ZTweenComponent.Create();
    }

    private static InitCheck() {
        if (ZTween.initialized) return;

        ZTween.Init();
    }

    public static To(getter, setter, endValue, duration: number) {
        ZTween.InitCheck();
        const t = ZTweenManager.GetTweener();
        t.SetUp(getter, setter, endValue, duration);
        return t;
    }

    public static TransfomMoveTo(transform: Transform, endValue: Vector3, duration: number) {
        return ZTween.To(
            () => transform.position,
            (v: Vector3) => {
                transform.position = v;
            },
            endValue, duration);
    }

    public static TransfomLocalMoveTo(transform: Transform, endValue: Vector3, duration: number) {
        return ZTween.To(
            () => transform.localPosition,
            (v: Vector3) => {
                transform.localPosition = v;
            },
            endValue, duration);
    }

    public static ScrollRectHorizontalNormalizedPositionTo(scrollRect: ScrollRect, endValue: number, duration: number) {
        return ZTween.To(
            () => scrollRect.horizontalNormalizedPosition,
            (v: number) => {
                scrollRect.horizontalNormalizedPosition = v;
            },
            endValue, duration);
    }

    public static ScrollRectVerticalNormalizedPositionTo(scrollRect: ScrollRect, endValue: number, duration: number) {
        return ZTween.To(
            () => scrollRect.verticalNormalizedPosition,
            (v: number) => {
                scrollRect.verticalNormalizedPosition = v;
            },
            endValue, duration);
    }

    public static MaterialColorTo(material: Material, endValue: Color, duration: number) {
        return ZTween.To(
            () => material.color,
            (v: Color) => {
                material.color = v;
            },
            endValue, duration);
    }

    public static ImageColorTo(image: Image, endValue: Color, duration: number) {
        return ZTween.To(
            () => image.color,
            (v: Color) => {
                image.color = v;
            },
            endValue, duration);
    }
}