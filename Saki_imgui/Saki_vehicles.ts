export const VEHICLES = {
    Infernus: { 
        modelId: 141, 
        message: "Saki酱: 刷出了一辆跑车!" 
    },
    Rhino: { 
        modelId: 162, 
        message: "Saki酱: 刷出了一辆坦克!" 
    }
} as const;

export type VehicleType = keyof typeof VEHICLES;