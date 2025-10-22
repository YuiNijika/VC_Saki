export class TabVehicles {
    private readonly vehicles = [
        { id: 162, name: "Rhino(坦克)" },
        { id: 141, name: "Infernus(跑车)" },
        { id: 191, name: "PCJ600(摩托车)" },
    ];

    private player = new Player(0);
    private customVehicleId = 191; // 默认设为PCJ600的ID
    private isSpawning = false; // 添加防重复生成标志
    private spawnCooldown = false; // 添加冷却标志
    private cooldownTimeout: ReturnType<typeof setTimeout> | null = null; // 冷却计时器

    private async spawnVehicle(modelId: number, vehicleName: string) {
        // 如果正在生成或处于冷却期，则直接返回
        if (this.isSpawning || this.spawnCooldown) {
            showTextBox("Saki酱: 车辆生成中或冷却中，请稍后再试!");
            return;
        }

        this.isSpawning = true; // 设置生成标志

        try {
            // 请求加载模型
            Streaming.RequestModel(modelId);

            // 异步等待模型加载完成
            let attempts = 0;
            const maxAttempts = 20; // 最大尝试次数至20次
            while (!Streaming.HasModelLoaded(modelId) && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(() => resolve(undefined), 100)); // 缩短间隔到100ms
                attempts++;
            }

            if (!Streaming.HasModelLoaded(modelId)) {
                throw new Error("模型加载超时");
            }

            // 生成车辆逻辑...
            const pos = this.addVec(
                this.player.getChar().getCoordinates(),
                { x: 2.0, y: -2.0, z: 0 }
            );
            const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);

            // 设置车辆...
            vehicle.lockDoors(0).closeAllDoors();
            const blip = Blip.AddForCar(vehicle);

            // 显示消息...
            const message = `Saki酱: 刷出了一辆${vehicleName}!`;
            showTextBox(message);
            log(`[车辆生成] ${message} (ID:${modelId} 位置:${pos.x.toFixed(0)},${pos.y.toFixed(0)})`);

            // 延迟清理资源并重置生成标志
            setTimeout(() => {
                try {
                    // 处理车辆和标记
                    if (vehicle) {
                        try {
                            vehicle.delete(); // 显式删除车辆
                        } catch (e) {
                            // 忽略删除错误
                        }
                    }
                    if (blip) {
                        try {
                            blip.remove(); // 移除小地图标记
                        } catch (e) {
                            // 忽略移除错误
                        }
                    }
                    Streaming.MarkModelAsNoLongerNeeded(modelId);
                } catch (e) {
                    log(`[警告] 清理车辆资源时出错: ${e}`);
                } finally {
                    this.isSpawning = false; // 重置生成标志

                    // 启动冷却时间
                    this.spawnCooldown = true;
                    if (this.cooldownTimeout) {
                        clearTimeout(this.cooldownTimeout);
                    }
                    this.cooldownTimeout = setTimeout(() => {
                        this.spawnCooldown = false;
                        this.cooldownTimeout = null;
                    }, 3000);
                }
            }, 1000);

        } catch (e) {
            log(`[错误] 生成车辆失败: ${e}`);
            showTextBox(`Saki酱: 刷车失败啦! (ID:${modelId})`);
            this.isSpawning = false; // 发生错误时也要重置标志

            // 错误情况下也启动冷却时间
            this.spawnCooldown = true;
            if (this.cooldownTimeout) {
                clearTimeout(this.cooldownTimeout);
            }
            this.cooldownTimeout = setTimeout(() => {
                this.spawnCooldown = false;
                this.cooldownTimeout = null;
            }, 5000);
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
        // 添加按钮状态提示
        const buttonText = this.isSpawning || this.spawnCooldown ? "生成中..." : "OK";
        if (ImGui.Button(buttonText, 120, 30)) {
            if (this.customVehicleId > 0 && !this.isSpawning && !this.spawnCooldown) {
                this.spawnVehicle(
                    this.customVehicleId,
                    `车(ID:${this.customVehicleId})`
                );
            } else {
                showTextBox("Saki酱: 车辆生成中或冷却中，请稍后再试!");
            }
        }

        ImGui.Spacing();
        ImGui.Separator();
        ImGui.Spacing();

        // 预设车辆按钮
        const buttonsPerRow = 3;
        this.vehicles.forEach((vehicle, index) => {
            let size = ImGui.GetScalingSize("S012", buttonsPerRow, false);
            // 根据生成状态改变按钮文本
            const buttonLabel = (this.isSpawning || this.spawnCooldown) ? `${vehicle.name}(生成中...)` : `${vehicle.name}##${vehicle.id}`;
            if (ImGui.Button(buttonLabel, 140, 50)) {
                // 加载模型
                if (!this.isSpawning && !this.spawnCooldown) {
                    this.spawnVehicle(vehicle.id, vehicle.name);
                } else {
                    showTextBox("Saki酱: 车辆生成中或冷却中，请稍后再试!");
                }
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