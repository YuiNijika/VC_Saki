const ImagePath = "CLEO/Saki_imgui/assets/vehicles";

export const VEHICLES = {
    Infernus: { 
        modelId: 141,
        image: ImagePath + "/infernus.jpg"
    },
    Rhino: { 
        modelId: 162,
        image: ImagePath + "/rhino.jpg"
    }
} as const;

export type VehicleType = keyof typeof VEHICLES;