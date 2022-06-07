"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnityEngine_1 = require("UnityEngine");
const ZEPETO_Script_1 = require("ZEPETO.Script");
const ZTween_1 = require("./ZTween");
const ZTweenManager_1 = require("./ZTweenManager");
class ZTweenComponent extends ZEPETO_Script_1.ZepetoScriptBehaviour {
    Update() {
        ZTweenManager_1.default.Update(UnityEngine_1.Time.deltaTime);
    }
    static Create() {
        if (ZTween_1.default.instance != null) {
            return;
        }
        const gameObject = new UnityEngine_1.GameObject("[ZTween]");
        UnityEngine_1.GameObject.DontDestroyOnLoad(gameObject);
        ZTween_1.default.instance = gameObject.AddComponent();
    }
    static DestroyInstance() {
        if (ZTween_1.default.instance != null) {
            UnityEngine_1.GameObject.Destroy(ZTween_1.default.instance.gameObject);
            ZTween_1.default.instance = null;
        }
    }
}
exports.default = ZTweenComponent;
