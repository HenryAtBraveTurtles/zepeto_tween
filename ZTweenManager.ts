
import ZTweener from "./ZTweener";

export default class ZTweenManager {
    private static activeTweens: ZTweener[] = [];
    private static tweenPool: ZTweener[] = [];

    public static GetTweener(): ZTweener {
        let t: ZTweener = null;
        if (this.tweenPool.length > 0) {
            t = this.tweenPool.pop();
        }
        else {
            t = new ZTweener();
        }
        ZTweenManager.AddActiveTween(t);
        return t;
    }

    private static AddActiveTween(t: ZTweener) {
        t.active = true;
        t.activeId = ZTweenManager.activeTweens.length;

        ZTweenManager.activeTweens.push(t);
    }

    private static RemoveActiveTween(t: ZTweener) {
        const index = this.activeTweens.indexOf(t);
        if (index > -1) {
            this.activeTweens.splice(index, 1);
        }
        this.tweenPool.push(t);
    }

    public static Update(deltaTime: number) {
        const activeTweens = [...ZTweenManager.activeTweens];
        for (const t of activeTweens) {
            t.Update(deltaTime);
            if (!t.active) {
                ZTweenManager.RemoveActiveTween(t);
            }
        }
    }
}