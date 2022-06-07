"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ease = void 0;
class EaseManager {
    static Evaluate(easeType, time, duration) {
        let overshootOrAmplitude = 1.70158;
        let period = 0;
        switch (easeType) {
            case Ease.Linear:
                return time / duration;
            case Ease.InSine:
                return -Math.cos(time / duration * EaseManager._PiOver2) + 1;
            case Ease.OutSine:
                return Math.sin(time / duration * EaseManager._PiOver2);
            case Ease.InOutSine:
                return -0.5 * (Math.cos(Math.PI * time / duration) - 1);
            case Ease.InQuad:
                return (time /= duration) * time;
            case Ease.OutQuad:
                return -(time /= duration) * (time - 2);
            case Ease.InOutQuad:
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * time * time;
                return -0.5 * ((--time) * (time - 2) - 1);
            case Ease.InCubic:
                return (time /= duration) * time * time;
            case Ease.OutCubic:
                return ((time = time / duration - 1) * time * time + 1);
            case Ease.InOutCubic:
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * time * time * time;
                return 0.5 * ((time -= 2) * time * time + 2);
            case Ease.InQuart:
                return (time /= duration) * time * time * time;
            case Ease.OutQuart:
                return -((time = time / duration - 1) * time * time * time - 1);
            case Ease.InOutQuart:
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * time * time * time * time;
                return -0.5 * ((time -= 2) * time * time * time - 2);
            case Ease.InQuint:
                return (time /= duration) * time * time * time * time;
            case Ease.OutQuint:
                return ((time = time / duration - 1) * time * time * time * time + 1);
            case Ease.InOutQuint:
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * time * time * time * time * time;
                return 0.5 * ((time -= 2) * time * time * time * time + 2);
            case Ease.InExpo:
                return (time == 0) ? 0 : Math.pow(2, 10 * (time / duration - 1));
            case Ease.OutExpo:
                if (time == duration)
                    return 1;
                return (-Math.pow(2, -10 * time / duration) + 1);
            case Ease.InOutExpo:
                if (time == 0)
                    return 0;
                if (time == duration)
                    return 1;
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * Math.pow(2, 10 * (time - 1));
                return 0.5 * (-Math.pow(2, -10 * --time) + 2);
            case Ease.InCirc:
                return -(Math.sqrt(1 - (time /= duration) * time) - 1);
            case Ease.OutCirc:
                return Math.sqrt(1 - (time = time / duration - 1) * time);
            case Ease.InOutCirc:
                if ((time /= duration * 0.5) < 1)
                    return -0.5 * (Math.sqrt(1 - time * time) - 1);
                return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
            case Ease.InElastic:
                if (time == 0)
                    return 0;
                if ((time /= duration) == 1)
                    return 1;
                {
                    period = duration * 0.3;
                    const s0 = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    return -(overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s0) * EaseManager._TwoPi / period));
                }
            case Ease.OutElastic:
                if (time == 0)
                    return 0;
                if ((time /= duration) == 1)
                    return 1;
                {
                    period = duration * 0.3;
                    const s1 = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    return (overshootOrAmplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - s1) * EaseManager._TwoPi / period) + 1);
                }
            case Ease.InOutElastic:
                if (time == 0)
                    return 0;
                if ((time /= duration * 0.5) == 2)
                    return 1;
                {
                    period = duration * (0.3 * 1.5);
                    const s = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    if (time < 1)
                        return -0.5 * (overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s) * EaseManager._TwoPi / period));
                    return overshootOrAmplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - s) * EaseManager._TwoPi / period) * 0.5 + 1;
                }
            case Ease.InBack:
                return (time /= duration) * time * ((overshootOrAmplitude + 1) * time - overshootOrAmplitude);
            case Ease.OutBack:
                return ((time = time / duration - 1) * time * ((overshootOrAmplitude + 1) * time + overshootOrAmplitude) + 1);
            case Ease.InOutBack:
                if ((time /= duration * 0.5) < 1)
                    return 0.5 * (time * time * (((overshootOrAmplitude *= (1.525)) + 1) * time - overshootOrAmplitude));
                return 0.5 * ((time -= 2) * time * (((overshootOrAmplitude *= (1.525)) + 1) * time + overshootOrAmplitude) + 2);
            case Ease.InBounce:
                return EaseManager.BounceEaseIn(time, duration);
            case Ease.OutBounce:
                return EaseManager.BounceEaseOut(time, duration);
            case Ease.InOutBounce:
                return EaseManager.BounceEaseInOut(time, duration);
            // Default
            default:
                // OutQuad
                return -(time /= duration) * (time - 2);
        }
    }
    static BounceEaseIn(time, duration) {
        return 1 - EaseManager.BounceEaseOut(duration - time, duration);
    }
    static BounceEaseOut(time, duration) {
        if ((time /= duration) < (1 / 2.75)) {
            return (7.5625 * time * time);
        }
        if (time < (2 / 2.75)) {
            return (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75);
        }
        if (time < (2.5 / 2.75)) {
            return (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375);
        }
        return (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375);
    }
    static BounceEaseInOut(time, duration) {
        if (time < duration * 0.5) {
            return EaseManager.BounceEaseIn(time * 2, duration) * 0.5;
        }
        return EaseManager.BounceEaseOut(time * 2 - duration, duration) * 0.5 + 0.5;
    }
}
exports.default = EaseManager;
EaseManager._PiOver2 = Math.PI * 0.5;
EaseManager._TwoPi = Math.PI * 2;
var Ease;
(function (Ease) {
    Ease[Ease["Unset"] = 0] = "Unset";
    Ease[Ease["Linear"] = 1] = "Linear";
    Ease[Ease["InSine"] = 2] = "InSine";
    Ease[Ease["OutSine"] = 3] = "OutSine";
    Ease[Ease["InOutSine"] = 4] = "InOutSine";
    Ease[Ease["InQuad"] = 5] = "InQuad";
    Ease[Ease["OutQuad"] = 6] = "OutQuad";
    Ease[Ease["InOutQuad"] = 7] = "InOutQuad";
    Ease[Ease["InCubic"] = 8] = "InCubic";
    Ease[Ease["OutCubic"] = 9] = "OutCubic";
    Ease[Ease["InOutCubic"] = 10] = "InOutCubic";
    Ease[Ease["InQuart"] = 11] = "InQuart";
    Ease[Ease["OutQuart"] = 12] = "OutQuart";
    Ease[Ease["InOutQuart"] = 13] = "InOutQuart";
    Ease[Ease["InQuint"] = 14] = "InQuint";
    Ease[Ease["OutQuint"] = 15] = "OutQuint";
    Ease[Ease["InOutQuint"] = 16] = "InOutQuint";
    Ease[Ease["InExpo"] = 17] = "InExpo";
    Ease[Ease["OutExpo"] = 18] = "OutExpo";
    Ease[Ease["InOutExpo"] = 19] = "InOutExpo";
    Ease[Ease["InCirc"] = 20] = "InCirc";
    Ease[Ease["OutCirc"] = 21] = "OutCirc";
    Ease[Ease["InOutCirc"] = 22] = "InOutCirc";
    Ease[Ease["InElastic"] = 23] = "InElastic";
    Ease[Ease["OutElastic"] = 24] = "OutElastic";
    Ease[Ease["InOutElastic"] = 25] = "InOutElastic";
    Ease[Ease["InBack"] = 26] = "InBack";
    Ease[Ease["OutBack"] = 27] = "OutBack";
    Ease[Ease["InOutBack"] = 28] = "InOutBack";
    Ease[Ease["InBounce"] = 29] = "InBounce";
    Ease[Ease["OutBounce"] = 30] = "OutBounce";
    Ease[Ease["InOutBounce"] = 31] = "InOutBounce";
})(Ease = exports.Ease || (exports.Ease = {}));
