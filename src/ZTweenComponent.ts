import { GameObject, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ZTween from './ZTween'
import ZTweenManager from './ZTweenManager';

export default class ZTweenComponent extends ZepetoScriptBehaviour {

    Update() {
        ZTweenManager.Update(Time.deltaTime);
    }

    public static Create() {
        if (ZTween.instance != null) {
            return;
        }

        const gameObject = new GameObject("[ZTween]");
        GameObject.DontDestroyOnLoad(gameObject);
        ZTween.instance = gameObject.AddComponent<ZTweenComponent>();
    }

    public static DestroyInstance() {
        if (ZTween.instance != null) {
            GameObject.Destroy(ZTween.instance.gameObject);
            ZTween.instance = null;
        }
    }
}