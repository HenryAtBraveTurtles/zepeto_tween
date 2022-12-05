import { Color, Vector3 } from "UnityEngine";
import EaseManager, { Ease } from "./EaseManager";

export default class ZTweener {
    public active: boolean = false;
    public activeId: number = -1;
    public position: number = 0;

    public setter;
    public getter;
    public startValue;
    public endValue;
    public changeValue;

    public onStart;
    public onComplete;

    public easeType: Ease = Ease.Linear;

    public duration: number = 0;

    private startUpDone: boolean = false;

    public SetUp(getter, setter, endValue, duration: number) {
        this.setter = setter;
        this.getter = getter;
        this.endValue = endValue;
        this.duration = duration;

        this.startValue = 0;
        this.changeValue = 0;
        this.position = 0;
        this.easeType = Ease.Linear;
        this.startUpDone = false;
        this.onStart = null;
        this.onComplete = null;
    }

    public SetEase(easeType:Ease) {
        this.easeType = easeType;
    }

    public Update(deltaTime: number) {
        let toPosition = this.position;
        toPosition += deltaTime;
        this.GoTo(toPosition);
    }

    public Stop() {
        this.active = false;
    }

    private GoTo(toPosition: number) {
        if (!this.startUpDone) {
            this.StartUp();
        }

        const prevPostion = this.position;
        this.position = toPosition;
        if (this.position >= this.duration) {
            this.Complete();
            return;
        }
        else if (this.position < 0) {
            this.position = 0;
        }
        this.EvaluateAndApply();
    }

    private Complete() {
        this.position = this.duration;
        this.EvaluateAndApply();

        if (this.onComplete) {
            this.onComplete();
        }

        this.active = false;
    }

    private EvaluateAndApply() {
        const t = EaseManager.Evaluate(this.easeType, this.position, this.duration);
        let newValue;
        if (this.startValue instanceof Vector3) {
            newValue = Vector3.op_Addition(this.startValue as Vector3, Vector3.op_Multiply(this.changeValue, t));
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${this.position}, ${this.duration} ${newValue.ToString()}`);
        }
        else if (this.startValue instanceof Color) {
            newValue = Color.Lerp(this.startValue as Color, this.changeValue as Color, t);
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${this.position}, ${this.duration} ${newValue.ToString()}`);
        }
        else {
            newValue = this.startValue + this.changeValue * t;
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${this.position}, ${this.duration} ${newValue}`);
        }
        this.setter(newValue);
    }

    private StartUp() {
        this.startUpDone = true;
        this.startValue = this.getter();
        if (this.endValue instanceof Vector3) {
            this.changeValue = Vector3.op_Subtraction(this.endValue as Vector3, this.startValue as Vector3);
            //console.log(`[ZTweener:StartUp][${this.activeId}] ${this.startValue.ToString()}, ${this.changeValue.ToString()}`);
        }
        if (this.endValue instanceof Color) {
            this.changeValue = this.endValue;
            //console.log(`[ZTweener:StartUp][${this.activeId}] ${this.startValue.ToString()}, ${this.changeValue.ToString()}`);
        }
        else {
            this.changeValue = this.endValue - this.startValue;
            //console.log(`[ZTweener:StartUp][${this.activeId}] ${this.startValue}, ${this.changeValue}`);
        }
        if (this.onStart) {
            this.onStart();
        }
    }
}