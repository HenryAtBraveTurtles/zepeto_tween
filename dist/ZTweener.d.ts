import { Ease } from "./EaseManager";
export default class ZTweener {
    active: boolean;
    activeId: number;
    position: number;
    setter: any;
    getter: any;
    startValue: any;
    endValue: any;
    changeValue: any;
    onStart: any;
    onComplete: any;
    easeType: Ease;
    duration: number;
    private startUpDone;
    SetUp(getter: any, setter: any, endValue: any, duration: number): void;
    Update(deltaTime: number): void;
    private GoTo;
    private Complete;
    private EvaluateAndApply;
    private StartUp;
}
