
export default class EaseManager {
    public static readonly _PiOver2 = Math.PI * 0.5;
    public static readonly _TwoPi = Math.PI * 2;
    public static Evaluate(easeType: Ease, time: number, duration: number): number {
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
                if ((time /= duration * 0.5) < 1) return 0.5 * time * time;
                return -0.5 * ((--time) * (time - 2) - 1);
            case Ease.InCubic:
                return (time /= duration) * time * time;
            case Ease.OutCubic:
                return ((time = time / duration - 1) * time * time + 1);
            case Ease.InOutCubic:
                if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time;
                return 0.5 * ((time -= 2) * time * time + 2);
            case Ease.InQuart:
                return (time /= duration) * time * time * time;
            case Ease.OutQuart:
                return -((time = time / duration - 1) * time * time * time - 1);
            case Ease.InOutQuart:
                if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time;
                return -0.5 * ((time -= 2) * time * time * time - 2);
            case Ease.InQuint:
                return (time /= duration) * time * time * time * time;
            case Ease.OutQuint:
                return ((time = time / duration - 1) * time * time * time * time + 1);
            case Ease.InOutQuint:
                if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time * time;
                return 0.5 * ((time -= 2) * time * time * time * time + 2);
            case Ease.InExpo:
                return (time == 0) ? 0 : Math.pow(2, 10 * (time / duration - 1));
            case Ease.OutExpo:
                if (time == duration) return 1;
                return (-Math.pow(2, -10 * time / duration) + 1);
            case Ease.InOutExpo:
                if (time == 0) return 0;
                if (time == duration) return 1;
                if ((time /= duration * 0.5) < 1) return 0.5 * Math.pow(2, 10 * (time - 1));
                return 0.5 * (-Math.pow(2, -10 * --time) + 2);
            case Ease.InCirc:
                return -(Math.sqrt(1 - (time /= duration) * time) - 1);
            case Ease.OutCirc:
                return Math.sqrt(1 - (time = time / duration - 1) * time);
            case Ease.InOutCirc:
                if ((time /= duration * 0.5) < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
                return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
            case Ease.InElastic:
                if (time == 0) return 0;
                if ((time /= duration) == 1) return 1;
                {
                    period = duration * 0.3;
                    const s0 = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    return -(overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s0) * EaseManager._TwoPi / period));
                }
            case Ease.OutElastic:
                if (time == 0) return 0;
                if ((time /= duration) == 1) return 1;
                {
                    period = duration * 0.3;
                    const s1 = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    return (overshootOrAmplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - s1) * EaseManager._TwoPi / period) + 1);
                }
            case Ease.InOutElastic:
                if (time == 0) return 0;
                if ((time /= duration * 0.5) == 2) return 1;
                {
                    period = duration * (0.3 * 1.5);
                    const s = period / EaseManager._TwoPi * Math.asin(1 / overshootOrAmplitude);
                    if (time < 1) return -0.5 * (overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s) * EaseManager._TwoPi / period));
                    return overshootOrAmplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - s) * EaseManager._TwoPi / period) * 0.5 + 1;
                }
            case Ease.InBack:
                return (time /= duration) * time * ((overshootOrAmplitude + 1) * time - overshootOrAmplitude);
            case Ease.OutBack:
                return ((time = time / duration - 1) * time * ((overshootOrAmplitude + 1) * time + overshootOrAmplitude) + 1);
            case Ease.InOutBack:
                if ((time /= duration * 0.5) < 1) return 0.5 * (time * time * (((overshootOrAmplitude *= (1.525)) + 1) * time - overshootOrAmplitude));
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

    private static BounceEaseIn(time: number, duration: number): number {
        return 1 - EaseManager.BounceEaseOut(duration - time, duration);
    }

    private static BounceEaseOut(time: number, duration: number): number {
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

    public static BounceEaseInOut(time: number, duration: number): number {
        if (time < duration * 0.5) {
            return EaseManager.BounceEaseIn(time * 2, duration) * 0.5;
        }
        return EaseManager.BounceEaseOut(time * 2 - duration, duration) * 0.5 + 0.5;
    }
}

export enum Ease {
    Unset, // Used to let TweenParams know that the ease was not set and apply it differently if used on Tweeners or Sequences
    Linear,
    InSine,
    OutSine,
    InOutSine,
    InQuad,
    OutQuad,
    InOutQuad,
    InCubic,
    OutCubic,
    InOutCubic,
    InQuart,
    OutQuart,
    InOutQuart,
    InQuint,
    OutQuint,
    InOutQuint,
    InExpo,
    OutExpo,
    InOutExpo,
    InCirc,
    OutCirc,
    InOutCirc,
    InElastic,
    OutElastic,
    InOutElastic,
    InBack,
    OutBack,
    InOutBack,
    InBounce,
    OutBounce,
    InOutBounce,
}