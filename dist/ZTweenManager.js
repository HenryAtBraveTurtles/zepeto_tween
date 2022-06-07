"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZTweener_1 = require("./ZTweener");
class ZTweenManager {
    static GetTweener() {
        let t = null;
        if (this.tweenPool.length > 0) {
            t = this.tweenPool.pop();
        }
        else {
            t = new ZTweener_1.default();
        }
        ZTweenManager.AddActiveTween(t);
        return t;
    }
    static AddActiveTween(t) {
        t.active = true;
        t.activeId = ZTweenManager.activeTweens.length;
        ZTweenManager.activeTweens.push(t);
    }
    static RemoveActiveTween(t) {
        const index = this.activeTweens.indexOf(t);
        if (index > -1) {
            this.activeTweens.splice(index, 1);
        }
        this.tweenPool.push(t);
    }
    static Update(deltaTime) {
        const activeTweens = [...ZTweenManager.activeTweens];
        for (const t of activeTweens) {
            t.Update(deltaTime);
            if (!t.active) {
                ZTweenManager.RemoveActiveTween(t);
            }
        }
    }
}
exports.default = ZTweenManager;
ZTweenManager.activeTweens = [];
ZTweenManager.tweenPool = [];
