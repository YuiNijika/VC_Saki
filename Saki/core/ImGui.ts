/// <reference path="../../.config/vc.d.ts" />
import { KeyCode } from '../../.config/enums';
import { TabVehicles } from './Gui/TabVehicles';

export class Saki_ImGui {
    private showWindow = false;
    private fontLoaded = false;
    private fontError = "";
    private customFontEnabled = false;
    private currentTab = 0; // 当前选中的Tab
    private vehiclesTab = new TabVehicles(); // 车辆Tab实例

    /**
     * 加载自定义字体
     */
    private loadCustomFont(): void {
        try {
            log("[字体] 开始加载自定义字体...");
            const result = ImGui.LoadCustomFont("CLEO/Saki/assets/AlibabaPuHuiTi-Black.ttf", 12.0);

            if (result) {
                this.fontLoaded = true;
                ImGui.SetCustomFontEnabled(true);
                this.customFontEnabled = ImGui.IsCustomFontEnabled();
                log("[字体] 自定义字体加载成功");
            } else {
                this.fontError = "字体加载失败";
                log("[字体] 字体加载失败");
            }
        } catch (error) {
            this.fontError = `字体加载异常: ${error}`;
            log(`[字体] ✗ 异常: ${error}`);
        }
    }

    private renderMainTab() {
        if (this.fontLoaded && this.customFontEnabled) {
            ImGui.Text("=== 中文测试 ===");
            ImGui.TextColored("你好，世界！", 0.0, 1.0, 1.0, 1.0);
            ImGui.TextColored("自定义字体显示正常", 0.0, 1.0, 1.0, 1.0);
            ImGui.TextColored("Saki 脚本运行中", 0.0, 1.0, 1.0, 1.0);
        } else {
            ImGui.Text("loading...");
        }

        ImGui.Separator();

        // 基本信息
        ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        ImGui.Text("按 F6 切换窗口");
    }

    private renderVehiclesTab() {
        this.vehiclesTab.render();
    }

    private renderAboutTab() {
        ImGui.Spacing();
        ImGui.Text("好哇塞的一个菜单啊");
        ImGui.Text("GTAMOD下载");
        ImGui.Text("www.gtamodx.com");
    }

    static FPS_Render() {
        const pos = [10.0, 10.0];
        ImGui.SetNextWindowPos(pos[0], pos[1], 0);
        ImGui.Begin("FPS_OVERLAY", true, true, true, true, true);
        ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        ImGui.End();
    }

    public Main() {
        wait(0);
        ImGui.BeginFrame("Saki ImGui");

        // 初始化字体
        if (!this.fontLoaded && !this.fontError) {
            this.loadCustomFont();
        }

        if (Pad.IsKeyPressed(KeyCode.F6)) {
            this.showWindow = true;
        }

        Saki_ImGui.FPS_Render();
        ImGui.SetCursorVisible(this.showWindow);

        if (this.showWindow) {
            ImGui.SetNextWindowSize(460.0, 600.0, 2);
            this.showWindow = ImGui.Begin("Saki ImGui", this.showWindow, false, false, false, false);

            ImGui.BeginChild("Saki ImGui Child");

            // 添加Tab栏
            this.currentTab = ImGui.Tabs("MainTabs", "主页,载具,关于");
            
            switch (this.currentTab) {
                case 0:
                    this.renderMainTab();
                    break;
                case 1:
                    this.renderVehiclesTab();
                    break;
                case 2:
                    this.renderAboutTab();
                    break;
            }

            ImGui.EndChild();
            ImGui.End();
        }
        ImGui.EndFrame();
    }
}