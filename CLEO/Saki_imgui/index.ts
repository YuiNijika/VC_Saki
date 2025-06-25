/**
 * @author 鼠子(Tomoriゞ)
 * @version 1.1.0
 * @description 基于 CLEO Redux 的简单功能脚本 for VC
 * @link https://github.com/ShuShuicu/VC_Saki
 * @license MIT
 */

/// <reference path="../.config/vc.d.ts" />
import { KeyCode } from '../.config/enums';

class Saki {
    private static readonly VEHICLES = {
        INFERNUS: { 
            modelId: 141, 
            message: "Saki酱: 刷出了一辆跑车!" 
        },
        RHINO: { 
            modelId: 162, 
            message: "Saki酱: 刷出了一辆坦克!" 
        }
    };

    private player: Player;
    private isRunning: boolean;
    private overlayWindowSize: [number, number] = [0, 0];
    private readonly overlayOffset = 10.0;
    private showFps = true;
    private readonly showCoord = true; // 是否显示坐标
    private gPlayerChar: Char;
    private showMainWindow = false; // 控制主窗口显示状态
    private cursorVisible = false; // 控制鼠标光标显示

    private gKonMeme = ImGui.LoadImage("CLEO/Saki_imgui/assets/yui.jpg");

    constructor() {
        log("===== Saki酱●█▀█▄Saki酱●█▀█▄Saki酱●█▀█▄ =====");
        this.player = new Player(0);
        this.gPlayerChar = this.player.getChar();
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
        ImGui.BeginFrame("SAKI_OVERLAY");

        // 根据主窗口状态设置鼠标光标可见性
        ImGui.SetCursorVisible(this.cursorVisible);

        // F12 渲染主窗口
        if (this.showMainWindow) {
            ImGui.SetNextWindowSize(350.0, 600.0, 2); // 2 = ImGuiCond_Once

            // 使用临时变量捕获窗口是否仍然可见
            const windowVisible = ImGui.Begin("Soyo Love~", this.showMainWindow, false, false, false, false);

            // 如果窗口原本是显示状态但现在不可见了，说明用户点击了关闭按钮
            if (this.showMainWindow && !windowVisible) {
                this.showMainWindow = false;
                this.cursorVisible = false;
            } else {
                this.showMainWindow = windowVisible;
            }

            if (this.showMainWindow) {
                ImGui.Spacing();

                // 添加标签页
                const activeTab = ImGui.Tabs("MainTabs", "Status,Spawn,Settings,About");

                if (activeTab === 0) { // Status
                    if (this.showFps) {
                        ImGui.Text(`FPS: ${Game.GetFramerate()}`);
                    }

                    if (this.showCoord) {
                        let coord = this.gPlayerChar.getCoordinates();
                        ImGui.Text(
                            `Position: ${coord.x.toFixed(0)}, ${coord.y.toFixed(0)}, ${coord.z.toFixed(0)}`
                        );
                    }
                } else if (activeTab === 1) { // 刷车
                    ImGui.Spacing();
                    if (ImGui.Button("Infernus", 120.0, 30.0)) {
                        this.spawnVehicle(
                            Saki.VEHICLES.INFERNUS.modelId,
                            Saki.VEHICLES.INFERNUS.message
                        );
                    }
                    ImGui.SameLine();
                    if (ImGui.Button("Rhino", 120.0, 30.0)) {
                        this.spawnVehicle(
                            Saki.VEHICLES.RHINO.modelId,
                            Saki.VEHICLES.RHINO.message
                        );
                    }
                } else if (activeTab === 2) { // 设置
                    ImGui.Spacing();
                    this.showFps = ImGui.Checkbox("Show FPS", this.showFps);
                } else if (activeTab === 3) { // 关于
                    ImGui.ButtonImage("Image Button", this.gKonMeme, 320.0, 180.0);
                }

                ImGui.End();
            }
        }

        const pos = this.calcOverlayPosition();
        ImGui.SetNextWindowPos(pos[0], pos[1], 1);
        ImGui.SetNextWindowTransparency(0.5);

        ImGui.Begin("Saki", true, true, true, true, true);
        const size = ImGui.GetWindowSize("SakiOverlaySizeID");
        this.overlayWindowSize = [size.width, size.height];

        if (this.showFps) {
            ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        }

        if (this.showCoord) {
            let coord = this.gPlayerChar.getCoordinates();
            ImGui.Text(
                `Position: ${coord.x.toFixed(0)}, ${coord.y.toFixed(0)}, ${coord.z.toFixed(0)}`
            );
        }

        ImGui.End();
        ImGui.EndFrame();
    }

    // 检查F12按键切换主窗口
    private checkToggleWindow(): void {
        if (Pad.IsKeyPressed(KeyCode.F12)) {
            this.showMainWindow = !this.showMainWindow;
            this.cursorVisible = this.showMainWindow; // 主窗口显示时显示鼠标光标
            log(`Soyo状态切换为: ${this.showMainWindow}`);
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
            wait(1000);
        }
    }

    private spawnVehicle(modelId: number, message: string): void {
        log(`开始加载车辆模型: ${modelId}`);
        this.loadModel(modelId);

        const pos = this.getSpawnPosition();
        log(`车辆将在位置 x:${pos.x.toFixed(2)}, y:${pos.y.toFixed(2)}, z:${pos.z.toFixed(2)} 生成`);

        const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);
        const blip = Blip.AddForCar(vehicle);
        log(`车辆已生成，ID: ${vehicle}`);

        this.setupVehicle(vehicle);
        this.showNotification(message);
        this.cleanup(vehicle, modelId, blip);
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
