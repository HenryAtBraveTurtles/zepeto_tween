export default class EaseManager {
    static readonly _PiOver2: number;
    static readonly _TwoPi: number;
    static Evaluate(easeType: Ease, time: number, duration: number): number;
    private static BounceEaseIn;
    private static BounceEaseOut;
    static BounceEaseInOut(time: number, duration: number): number;
}
export declare enum Ease {
    Unset = 0,
    Linear = 1,
    InSine = 2,
    OutSine = 3,
    InOutSine = 4,
    InQuad = 5,
    OutQuad = 6,
    InOutQuad = 7,
    InCubic = 8,
    OutCubic = 9,
    InOutCubic = 10,
    InQuart = 11,
    OutQuart = 12,
    InOutQuart = 13,
    InQuint = 14,
    OutQuint = 15,
    InOutQuint = 16,
    InExpo = 17,
    OutExpo = 18,
    InOutExpo = 19,
    InCirc = 20,
    OutCirc = 21,
    InOutCirc = 22,
    InElastic = 23,
    OutElastic = 24,
    InOutElastic = 25,
    InBack = 26,
    OutBack = 27,
    InOutBack = 28,
    InBounce = 29,
    OutBounce = 30,
    InOutBounce = 31
}
