/**
 * @author 鼠子(Tomoriゞ)
 * @version 1.1.0_Dev
 * @description 基于 CLEO Redux 的简单功能脚本 for VC
 * @link https://github.com/ShuShuicu/VC_Saki
 * @license MIT
 */

/// <reference path="../.config/vc.d.ts" />
import { KeyCode } from '../.config/enums';
import { SakiImgUI } from './includes/Saki_imgui';

class Saki {

    private player: Player;
    private isRunning: boolean;
    private readonly overlayOffset = 10.0;
    private gPlayerChar: Char;

    private imgUI: SakiImgUI;

    constructor() {
        log("===== Saki酱●█▀█▄Saki酱●█▀█▄Saki酱●█▀█▄ =====");
        this.player = new Player(0);
        this.gPlayerChar = this.player.getChar();
        this.imgUI = new SakiImgUI(
            true,  // showFps
            true,  // showCoord
            (modelId, message) => this.spawnVehicle(modelId, message)
        );
        this.isRunning = true;
        this.init();
    }

    private init(): void {
        try {
            log("开始主循环监听");
            while (this.isRunning) {
                wait(0);

                this.checkSaveKey();
                this.checkToggleWindow();
                this.renderOverlay();
            }
        } catch (e) {
            log("Saki酱严重错误: ", e);
            exit("Saki酱异常终止");
        } finally {
            log("Saki酱已停止运行");
        }
    }

    private renderOverlay(): void {
        this.imgUI.renderOverlay(this.gPlayerChar);
    }

    // 检查F12按键切换主窗口
    private checkToggleWindow(): void {
        if (Pad.IsKeyPressed(KeyCode.F12)) {
            this.imgUI.toggleMainWindow();
        }
    }

    private calcOverlayPosition(): [number, number] {
        const displaySize = ImGui.GetDisplaySize();
        return [
            this.overlayOffset,
            this.overlayOffset
        ];
    }

    private exitScript(): void {
        log("正在退出Saki酱...");
        this.isRunning = false;
        exit("Saki酱已正常退出");
    }

    private checkSaveKey(): void {
        if (Pad.IsKeyPressed(KeyCode.F11)) {
            log("检测到F11按键，激活保存菜单");
            Game.ActivateSaveMenu();
            log("保存菜单已激活");
            wait(0);
        }
    }

    private spawnVehicle(modelId: number, message: string): void {
        // 加载模型
        Streaming.RequestModel(modelId);
        while (!Streaming.HasModelLoaded(modelId)) {
            wait(250);
        }

        // 生成车辆
        const pos = this.addVec(this.player.getChar().getCoordinates(), { x: 2.0, y: -2.0, z: 0 });
        const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);

        // 设置车辆
        vehicle.lockDoors(0).closeAllDoors();
        const blip = Blip.AddForCar(vehicle);

        // 显示结果
        this.showNotification(message);
        log(`[车辆生成] ${message} (ID:${vehicle} 位置:${pos.x.toFixed(0)},${pos.y.toFixed(0)})`);

        // 清理
        wait(2000);
        vehicle.markAsNoLongerNeeded();
        Streaming.MarkModelAsNoLongerNeeded(modelId);
        blip.remove();
    }

    private getSpawnPosition(): { x: number; y: number; z: number } {
        const playerPos = this.player.getChar().getCoordinates();
        log(`玩家当前位置: x:${playerPos.x.toFixed(2)}, y:${playerPos.y.toFixed(2)}, z:${playerPos.z.toFixed(2)}`);
        return this.addVec(playerPos, { x: 2.0, y: -2.0, z: 0 });
    }

    private setupVehicle(vehicle: Car): void {
        vehicle.lockDoors(0);
        vehicle.closeAllDoors();
        log("车辆门锁已设置");
    }

    private showNotification(message: string): void {
        showTextBox(message);
        log(`显示通知: ${message}`);
    }

    private cleanup(vehicle: Car, modelId: number, blip: Blip): void {
        vehicle.markAsNoLongerNeeded();
        Streaming.MarkModelAsNoLongerNeeded(modelId);
        log(`车辆 ${modelId} 标记为不再需要`);

        wait(2000);
        blip.remove();
        log("车辆雷达标记已移除");
    }

    private loadModel(modelId: number): void {
        log(`请求加载模型: ${modelId}`);
        Streaming.RequestModel(modelId);

        let attempts = 0;
        while (!Streaming.HasModelLoaded(modelId)) {
            attempts++;
            log(`等待模型加载: ${modelId}... (尝试 ${attempts})`);
            if (attempts > 20) {
                log(`模型加载超时: ${modelId}`);
                throw new Error(`无法加载模型: ${modelId}`);
            }
            wait(250);
        }
        log(`模型加载完成: ${modelId}`);
    }

    private addVec(v1: { x: number; y: number; z: number }, v2: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
        const result = {
            x: v1.x + v2.x,
            y: v1.y + v2.y,
            z: v1.z + v2.z
        };
        log(`向量相加结果: x:${result.x.toFixed(2)}, y:${result.y.toFixed(2)}, z:${result.z.toFixed(2)}`);
        return result;
    }
}

log("===== Saki酱初始化 =====");
try {
    new Saki();
    log("Saki酱已成功启动");
} catch (e) {
    log("Saki酱初始化失败: ", e);
    exit("Saki酱初始化异常");
}
