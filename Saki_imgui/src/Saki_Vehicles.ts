const baseDri = 'CLEO/Saki_imgui/assets/vehicles/';

export class VehiclesTab {
    private readonly vehicles = [
        { id: 162, name: "Rhino", class: "坦克", img: baseDri + 'rhino.jpg' },
        { id: 141, name: "Infernus", class: "跑车", img: baseDri + 'infernus.jpg' },
        { id: 191, name: "PCJ600", class: "摩托车", img: baseDri + 'pcj-600.jpg' },
    ];

    private player = new Player(0);
    private customVehicleId = 191; // 默认设为PCJ600的ID

    private spawnVehicle(modelId: number, vehicleName: string) {
        try {
            // 加载模型
            Streaming.RequestModel(modelId);
            while (!Streaming.HasModelLoaded(modelId)) {
                wait(250);
            }

            // 生成车辆
            const pos = this.addVec(
                this.player.getChar().getCoordinates(),
                { x: 2.0, y: -2.0, z: 0 }
            );
            const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);

            // 设置车辆
            vehicle.lockDoors(0).closeAllDoors();
            const blip = Blip.AddForCar(vehicle);

            // 显示消息
            const message = `Saki酱: 刷出了一辆${vehicleName}!`;
            showTextBox(message);
            log(`[车辆生成] ${message} (ID:${modelId} 位置:${pos.x.toFixed(0)},${pos.y.toFixed(0)})`);

            // 清理资源
            wait(2000);
            vehicle.markAsNoLongerNeeded();
            Streaming.MarkModelAsNoLongerNeeded(modelId);
            blip.remove();
        } catch (e) {
            log(`[错误] 生成车辆失败: ${e}`);
            showTextBox(`Saki酱: 刷车失败啦! (ID:${modelId})`);
        }
    }

    private addVec(v1: Vector3, v2: Vector3): Vector3 {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y,
            z: v1.z + v2.z
        };
    }

    public render() {

        ImGui.Spacing();

        // 自定义车辆ID输入
        ImGui.Text("ID:");
        ImGui.SameLine();
        this.customVehicleId = ImGui.InputFloat(
            "",
            this.customVehicleId,
            0,
            20000,
        );

        ImGui.SameLine();
        if (ImGui.Button("OK", 120, 30)) {
            if (this.customVehicleId > 0) {
                this.spawnVehicle(
                    this.customVehicleId,
                    `车(ID:${this.customVehicleId})`
                );
            } else {
                showTextBox("Saki酱: 请输入有效的车辆ID!");
            }
        }

        ImGui.Spacing();
        ImGui.Separator();
        ImGui.Spacing();

        // 预设车辆按钮
        const buttonsPerRow = 4;
        this.vehicles.forEach((vehicle, index) => {
            let size = ImGui.GetScalingSize("S012", buttonsPerRow, false);
            if (ImGui.Button(`${vehicle.name}##${vehicle.class}`, size.x, size.y * 1)) {
                // 加载模型
                this.spawnVehicle(vehicle.id, vehicle.name + vehicle.class);
            }

            // 自动排列按钮
            if (index < this.vehicles.length - 1 &&
                (index + 1) % buttonsPerRow !== 0) {
                ImGui.SameLine();
            }
        });
    }
}

// 类型定义
interface Vector3 {
    x: number;
    y: number;
    z: number;
}