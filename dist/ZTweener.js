"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnityEngine_1 = require("UnityEngine");
const EaseManager_1 = require("./EaseManager");
class ZTweener {
    constructor() {
        this.active = false;
        this.activeId = -1;
        this.position = 0;
        this.easeType = EaseManager_1.Ease.Linear;
        this.duration = 0;
        this.startUpDone = false;
    }
    SetUp(getter, setter, endValue, duration) {
        this.setter = setter;
        this.getter = getter;
        this.endValue = endValue;
        this.duration = duration;
        this.startValue = 0;
        this.changeValue = 0;
        this.position = 0;
        this.easeType = EaseManager_1.Ease.Linear;
        this.startUpDone = false;
        this.onStart = null;
        this.onComplete = null;
    }
    Update(deltaTime) {
        let toPosition = this.position;
        toPosition += deltaTime;
        this.GoTo(toPosition);
    }
    GoTo(toPosition) {
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
    Complete() {
        this.position = this.duration;
        this.EvaluateAndApply();
        if (this.onComplete) {
            this.onComplete();
        }
        this.active = false;
    }
    EvaluateAndApply() {
        const t = EaseManager_1.default.Evaluate(this.easeType, this.position, this.duration);
        let newValue;
        if (this.startValue instanceof UnityEngine_1.Vector3) {
            newValue = UnityEngine_1.Vector3.op_Addition(this.startValue, UnityEngine_1.Vector3.op_Multiply(this.changeValue, t));
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${this.position}, ${this.duration} ${newValue.ToString()}`);
        }
        else {
            newValue = this.startValue + this.changeValue * t;
            //console.log(`[ZTweener:EvaluateAndApply][${this.activeId}] ${this.position}, ${this.duration} ${newValue}`);
        }
        this.setter(newValue);
    }
    StartUp() {
        this.startUpDone = true;
        this.startValue = this.getter();
        if (this.endValue instanceof UnityEngine_1.Vector3) {
            this.changeValue = UnityEngine_1.Vector3.op_Subtraction(this.endValue, this.startValue);
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
exports.default = ZTweener;
