import { Color, Vector3 } from "UnityEngine";
import EaseManager, { Ease } from "./EaseManager";
import { LoopType } from './LoopType'

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
    public loopType: LoopType = LoopType.Restart;
    private positionMovingBackward: boolean = false;
    private loopCountLeft: number = 1;

    public duration: number = 0;

    private startUpDone: boolean = false;

    public SetUp(getter, setter, endValue, duration: number) {
        this.setter = setter;
        this.getter = getter;
        this.endValue = endValue;
        this.duration = duration;

        this.position = 0;
        this.easeType = Ease.Linear;
        this.startUpDone = false;
        this.onStart = null;
        this.onComplete = null;
        this.positionMovingBackward = false;
        this.loopCountLeft = 1
    }

    public SetEase(easeType:Ease):ZTweener {
        this.easeType = easeType;
        return this;
    }

    public SetLoops(loopCount: number, loopType: LoopType): ZTweener {
        this.loopCountLeft = loopCount;
        this.loopType = loopType;
        return this;
    }

    public SetOnComplete(onComplete: any): ZTweener {
        this.onComplete = onComplete;
        return this;
    }

    public SetOnStart(onStart: any): ZTweener {
        this.onStart = onStart;
        return this;
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

        this.position = toPosition;
        if (this.position >= this.duration) {
            this.loopCountLeft -= 1;
            if (this.loopCountLeft == 0) {
                this.Complete();
            }
            else {
                if (this.loopType == LoopType.Yoyo) {
                    this.positionMovingBackward = !this.positionMovingBackward;
                }
                this.GoTo(this.position - this.duration);
            }
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
        const position = this.positionMovingBackward ? this.duration - this.position : this.position;
        const t = EaseManager.Evaluate(this.easeType, position, this.duration);
        let newValue:any = null;
        if (this.startValue instanceof Vector3) {
            newValue = Vector3.op_Addition(this.startValue as Vector3, Vector3.op_Multiply(this.changeValue, t));
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${position}, ${this.duration} ${newValue.ToString()}`);
        }
        else if (this.startValue instanceof Color) {
            newValue = Color.Lerp(this.startValue as Color, this.changeValue as Color, t);
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${position}, ${this.duration} ${newValue.ToString()}`);
        }
        else {
            newValue = this.startValue + this.changeValue * t;
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${position}, ${this.duration} ${newValue}`);
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
        else if (this.endValue instanceof Color) {
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