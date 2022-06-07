import ZTweener from "./ZTweener";
export default class ZTweenManager {
    private static activeTweens;
    private static tweenPool;
    static GetTweener(): ZTweener;
    private static AddActiveTween;
    private static RemoveActiveTween;
    static Update(deltaTime: number): void;
}
