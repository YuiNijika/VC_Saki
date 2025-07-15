export class FPSOverlay {
    static render() {
        const pos = [10.0, 10.0]; // 窗口坐标
        ImGui.SetNextWindowPos(pos[0], pos[1], 0);
        
        // 窗口标志
        ImGui.Begin("FPS_OVERLAY", true, true, true, true, true);

        ImGui.Text(`FPS: ${Game.GetFramerate()}`);
        ImGui.End();
    }
}