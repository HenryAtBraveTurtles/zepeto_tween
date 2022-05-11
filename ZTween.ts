import { Application, Transform, Vector3 } from "UnityEngine";
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
            () => {
                return transform.position;
            },
            (v: Vector3) => {
                transform.position = v;
            },
            endValue, duration);
    }

    public static TransfomLocalMoveTo(transform: Transform, endValue: Vector3, duration: number) {
        return ZTween.To(
            () => {
                return transform.localPosition;
            },
            (v: Vector3) => {
                transform.localPosition = v;
            },
            endValue, duration);
    }
}