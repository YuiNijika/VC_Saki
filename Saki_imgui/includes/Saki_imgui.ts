import { VEHICLES } from "./Saki_vehicles";

export class SakiImgUI {
    private readonly gIMG = {
        konMeme: ImGui.LoadImage("CLEO/Saki_imgui/assets/yui.jpg"),
        infernus: ImGui.LoadImage(VEHICLES.Infernus.image),
        rhino: ImGui.LoadImage(VEHICLES.Rhino.image)
    };

    private gVersion = "1.1.0";
    private showFps: boolean;
    private showCoord: boolean;
    private showMainWindow = false;
    private cursorVisible = false;

    constructor(
        showFps: boolean,
        showCoord: boolean,
        private spawnVehicle: (modelId: number, message: string) => void
    ) {
        this.showFps = showFps;
        this.showCoord = showCoord;
    }

    public renderOverlay(gPlayerChar: Char): void {
        ImGui.BeginFrame("SAKI_OVERLAY");
        ImGui.SetCursorVisible(this.cursorVisible);

        if (this.showMainWindow) {
            this.renderMainWindow(gPlayerChar);
        }

        this.renderFPSOverlay(gPlayerChar);
        ImGui.EndFrame();
    }

    private renderMainWindow(gPlayerChar: Char): void {
        ImGui.SetNextWindowSize(350.0, 600.0, 2);

        const windowVisible = ImGui.Begin("Soyo Love~", this.showMainWindow, false, false, false, false);

        this.showMainWindow = windowVisible;
        this.cursorVisible = windowVisible;

        if (!windowVisible) return;

        ImGui.Spacing();
        const activeTab = ImGui.Tabs("MainTabs", "Status,Spawn,Settings,About");

        // 对象映射
        const tabRenderers = {
            0: () => this.renderStatusTab(gPlayerChar),
            // 1: () => ImGui.Text("test"),
            1: () => this.renderSpawnTab(),
            2: () => this.renderSettingsTab(),
            3: () => this.renderAboutTab(),
        };

        tabRenderers[activeTab as keyof typeof tabRenderers]?.();
        ImGui.End();
    }

    private renderStatusTab(gPlayerChar: Char): void {
        const coord = gPlayerChar.getCoordinates();
        ImGui.Text(
            `FPS: ${Game.GetFramerate()}`
        );
        ImGui.Text(
            `Position: ${coord.x.toFixed(0)}, ${coord.y.toFixed(0)}, ${coord.z.toFixed(0)}`
        );
    }

    private renderSpawnTab(): void {
        ImGui.Spacing();

        (Object.keys(VEHICLES) as (keyof typeof VEHICLES)[]).forEach((vehicle, index) => {
            if (index > 0) ImGui.SameLine();
            if (ImGui.ButtonImage(
                vehicle, 
                this.gIMG[vehicle.toLowerCase() as keyof typeof this.gIMG], // 使用预加载的图像ID
                120, 60
            )) {
                this.spawnVehicle(
                    VEHICLES[vehicle].modelId,
                    `Saki酱: 刷出了一辆${vehicle}!` // 统一消息模板
                );
            }
        });
    }

    private renderSettingsTab(): void {
        ImGui.Spacing();
        this.showFps = ImGui.Checkbox("Show FPS", this.showFps);
        ImGui.SameLine();
        this.showCoord = ImGui.Checkbox("Show Coordinates", this.showCoord);
    }

    private renderAboutTab(): void {
        ImGui.Text(`Saki v${this.gVersion}`);
    }

    private renderFPSOverlay(gPlayerChar: Char): void {
        const pos = [10.0, 10.0];
        ImGui.SetNextWindowPos(pos[0], pos[1], 1);
        ImGui.SetNextWindowTransparency(0.5);

        ImGui.Begin("Saki", true, true, true, true, true);
        if (this.showFps) {
            ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        }
        if (this.showCoord) {
            const coord = gPlayerChar.getCoordinates();
            ImGui.Text(
                `Position: ${coord.x.toFixed(0)}, ${coord.y.toFixed(0)}, ${coord.z.toFixed(0)}`
            );
        }
        ImGui.End();
    }

    public toggleMainWindow(): void {
        this.showMainWindow = !this.showMainWindow;
        this.cursorVisible = this.showMainWindow;
        log(`Soyo状态切换为: ${this.showMainWindow}`);
    }

    public getShowFps(): boolean {
        return this.showFps;
    }
}