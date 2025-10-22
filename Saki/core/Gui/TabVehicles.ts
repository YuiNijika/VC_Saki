import { Utils } from '../Utils';

export class TabVehicles {
    private player = new Player(0);
    private customVehicleId = 191;
    private currentVehicleTab = 0;

    private spawnVehicle(modelId: number, vehicleName: string) {
        try {
            Streaming.RequestModel(modelId);
            while (!Streaming.HasModelLoaded(modelId)) {
                wait(50);
            }

            const pos = this.addVec(
                this.player.getChar().getCoordinates(),
                { x: 2.0, y: -2.0, z: 0 }
            );
            const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);

            vehicle.lockDoors(0).closeAllDoors();
            const blip = Blip.AddForCar(vehicle);

            const message = `Saki酱: 刷出了一辆${vehicleName}!`;
            showTextBox(message);
            log(`[车辆生成] ${message} (ID:${modelId} 位置:${pos.x.toFixed(0)},${pos.y.toFixed(0)})`);

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
        this.customVehicleId = ImGui.InputFloat("", this.customVehicleId, 0, 20000);
        ImGui.SameLine();
        if (ImGui.Button("OK", 120, 30)) {
            if (this.customVehicleId > 0) {
                const vehicleInfo = Utils.getVehicleById(this.customVehicleId);
                const displayName = vehicleInfo ? (vehicleInfo.commonName || vehicleInfo.name) : `车(ID:${this.customVehicleId})`;
                this.spawnVehicle(this.customVehicleId, displayName);
            } else {
                showTextBox("Saki酱: 请输入有效的车辆ID!");
            }
        }

        // 车辆分类Tab
        const vehicleTabs = [
            "跑车", "摩托车", "轿车", "越野车", "特殊车辆",
            "货车", "出租车", "直升机", "船只", "飞机", "两门车", "其他"
        ];

        this.currentVehicleTab = ImGui.Tabs("VehicleTabs", vehicleTabs.join(","));
        ImGui.Spacing();

        const currentVehicles = this.getCurrentVehicles().map(vehicle => ({
            ...vehicle,
            commonName: vehicle.commonName || vehicle.name || `车(ID:${vehicle.id})`
        }));
        
        this.renderVehicleButtons(currentVehicles, 2, 210);
    }

    private getCurrentVehicles(): { id: number; name: string; commonName?: string }[] {
        switch (this.currentVehicleTab) {
            case 0: return Utils.VEHICLES.sports;
            case 1: return Utils.VEHICLES.motorbikes;
            case 2: return Utils.VEHICLES.sedans;
            case 3: return Utils.VEHICLES.offroad;
            case 4: return Utils.VEHICLES.special;
            case 5: return Utils.VEHICLES.vans;
            case 6: return Utils.VEHICLES.taxis;
            case 7: return Utils.VEHICLES.helicopters;
            case 8: return Utils.VEHICLES.boats;
            case 9: return Utils.VEHICLES.planes;
            case 10: return Utils.VEHICLES.twoDoor;
            case 11: return Utils.VEHICLES.others;
            default: return [];
        }
    }

    /**
     * 渲染车辆按钮
     */
    private renderVehicleButtons(vehicles: { id: number; name: string; commonName: string }[], buttonsPerRow: number, buttonWidth: number) {
        if (!vehicles || vehicles.length === 0) {
            ImGui.Text("该分类暂无车辆");
            return;
        }

        const buttonHeight = 50;

        vehicles.forEach((vehicle, index) => {
            if (ImGui.Button(vehicle.commonName, buttonWidth, buttonHeight)) {
                this.spawnVehicle(vehicle.id, vehicle.commonName);
            }

            if (index < vehicles.length - 1 && (index + 1) % buttonsPerRow !== 0) {
                ImGui.SameLine();
            }
        });
    }
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}