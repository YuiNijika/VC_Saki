import { VEHICLES } from './Saki_vehicles';

export class SakiImgUI {
    private readonly gIMG = {
        Tommy: ImGui.LoadImage("CLEO/Saki_imgui/assets/Tommy.jpg"),
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
        ImGui.SetNextWindowSize(350.0, 600.0, 2); // 2 = ImGuiCond_Once

        const windowVisible = ImGui.Begin("Soyo Love~", this.showMainWindow, false, false, false, false);

        if (this.showMainWindow && !windowVisible) {
            this.showMainWindow = false;
            this.cursorVisible = false;
        } else {
            this.showMainWindow = windowVisible;
        }

        if (this.showMainWindow) {
            ImGui.Spacing();
            const activeTab = ImGui.Tabs("MainTabs", "Status,Spawn,Settings,About");

            switch (activeTab) {
                case 0: // Status
                    this.renderStatusTab(gPlayerChar);
                    break;
                case 1: // Spawn
                    this.renderSpawnTab();
                    break;
                case 2: // Settings
                    ImGui.Spacing();
                    this.showFps = ImGui.Checkbox("Show FPS", this.showFps);
                    ImGui.SameLine();
                    this.showCoord = ImGui.Checkbox("Show Coordinates", this.showCoord);
                    break;
                case 3: // About
                    this.renderAboutTab();
                    break;
            }

            ImGui.End();
        }
    }

    private renderStatusTab(gPlayerChar: Char): void {
        if (this.showFps) {
            ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        }

        if (this.showCoord) {
            let coord = gPlayerChar.getCoordinates();
            ImGui.Text(
                `Position: ${coord.x.toFixed(0)}, ${coord.y.toFixed(0)}, ${coord.z.toFixed(0)}`
            );
        }
    }

    private renderSpawnTab(): void {
        ImGui.Spacing();
        if (ImGui.Button("Infernus", 120.0, 30.0)) {
            this.spawnVehicle(
                VEHICLES.Infernus.modelId,
                VEHICLES.Infernus.message
            );
        }
        ImGui.SameLine();
        if (ImGui.Button("Rhino", 120.0, 30.0)) {
            this.spawnVehicle(
                VEHICLES.Rhino.modelId,
                VEHICLES.Rhino.message
            );
        }
    }

    private renderAboutTab(): void {
        ImGui.ButtonImage("Image Button", this.gIMG.Tommy, 320.0, 180.0);
        ImGui.Spacing();
        ImGui.Text("Saki by Tomori");
        ImGui.Text("GTAMOD: www.gtamodx.com");
        ImGui.Spacing();
        ImGui.Text("Version: " + this.gVersion);
        ImGui.Text("GitHub: https://github.com/ShuShuicu/VC_Saki");
    }

    private renderFPSOverlay(gPlayerChar: Char): void {
        const pos = [10.0, 10.0]; // overlayOffset
        ImGui.SetNextWindowPos(pos[0], pos[1], 1);
        ImGui.SetNextWindowTransparency(0.5);

        ImGui.Begin("Saki", true, true, true, true, true);

        if (this.showFps) {
            ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        }

        if (this.showCoord) {
            let coord = gPlayerChar.getCoordinates();
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