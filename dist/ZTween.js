"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZTweenComponent_1 = require("./ZTweenComponent");
const ZTweenManager_1 = require("./ZTweenManager");
class ZTween {
    static Init() {
        if (ZTween.initialized)
            return;
        ZTween.initialized = true;
        ZTweenComponent_1.default.Create();
    }
    static InitCheck() {
        if (ZTween.initialized)
            return;
        ZTween.Init();
    }
    static To(getter, setter, endValue, duration) {
        ZTween.InitCheck();
        const t = ZTweenManager_1.default.GetTweener();
        t.SetUp(getter, setter, endValue, duration);
        return t;
    }
    static TransfomMoveTo(transform, endValue, duration) {
        return ZTween.To(() => transform.position, (v) => {
            transform.position = v;
        }, endValue, duration);
    }
    static TransfomLocalMoveTo(transform, endValue, duration) {
        return ZTween.To(() => transform.localPosition, (v) => {
            transform.localPosition = v;
        }, endValue, duration);
    }
    static ScrollRectHorizontalNormalizedPositionTo(scrollRect, endValue, duration) {
        return ZTween.To(() => scrollRect.horizontalNormalizedPosition, (v) => {
            scrollRect.horizontalNormalizedPosition = v;
        }, endValue, duration);
    }
    static ScrollRectVerticalNormalizedPositionTo(scrollRect, endValue, duration) {
        return ZTween.To(() => scrollRect.verticalNormalizedPosition, (v) => {
            scrollRect.verticalNormalizedPosition = v;
        }, endValue, duration);
    }
}
exports.default = ZTween;
ZTween.instance = null;
ZTween.initialized = false;
