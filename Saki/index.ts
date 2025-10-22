/**
 * Saki
 * @author 鼠子
 */

/// <reference path="../.config/vc.d.ts" />
import { KeyCode } from '../.config/enums';
import { Utils } from './core/Utils';
import { Saki_ImGui } from './core/ImGui';

class Saki {
    private imguiInstance: Saki_ImGui;

    constructor() {
        log("===== Saki酱●█▀█▄Saki酱●█▀█▄Saki酱●█▀█▄ =====");
        this.imguiInstance = new Saki_ImGui(); // 创建实例
    }

    public Main() {
        // 保存游戏
        if (Pad.IsKeyPressed(KeyCode.F5)) {
            Utils.saveGame();
            log(Utils.formatDateTime(Date.now()) + ": 保存菜单已激活");
            wait(1000);
        }
        this.imguiInstance.Main();
    }
}

log("===== 启动 Saki =====");

const saki = new Saki();
// 主循环
while (true) {
    saki.Main();
    wait(0);
}