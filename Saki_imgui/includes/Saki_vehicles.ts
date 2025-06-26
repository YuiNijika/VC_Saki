const ImgPath = "CLEO/Saki_imgui/assets/";

export const VEHICLES = {
    Infernus: { 
        modelId: 141, 
        img: ImgPath + "Infernus.png",
        message: "Saki酱: 刷出了一辆跑车!" 
    },
    Rhino: { 
        modelId: 162, 
        img: ImgPath + "Rhino.png",
        message: "Saki酱: 刷出了一辆坦克!" 
    }
} as const;

export type VehicleType = keyof typeof VEHICLES;