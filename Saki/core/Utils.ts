import { KeyCode } from '../../.config/enums';

export class Utils {
    /**
     * 按类型分类的车辆列表
     */
    public static readonly VEHICLES = {
        // 跑车
        sports: [
            { id: 132, name: "Stinger", commonName: "毒刺" },
            { id: 141, name: "Infernus", commonName: "地狱火" },
            { id: 145, name: "Cheetah", commonName: "猎豹" },
            { id: 159, name: "Banshee", commonName: "女妖" },
            { id: 207, name: "Phoenix", commonName: "凤凰" },
            { id: 210, name: "Comet", commonName: "彗星" },
            { id: 211, name: "Deluxo", commonName: "德罗索" },
            { id: 224, name: "Hotring Racer", commonName: "赛道之王" },
            { id: 232, name: "Hotring Racer A", commonName: "赛道之王A" },
            { id: 233, name: "Hotring Racer B", commonName: "赛道之王B" }
        ],
        
        // 摩托车
        motorbikes: [
            { id: 191, name: "PCJ 600", commonName: "潘长江600" },
            { id: 166, name: "Angel", commonName: "哈雷摩托" },
            { id: 193, name: "Freeway", commonName: "白哈雷摩托" },
            { id: 198, name: "Sanchez", commonName: "越野摩托" }
        ],
        
        // 轿车
        sedans: [
            { id: 135, name: "Sentinel", commonName: "哨兵" },
            { id: 147, name: "FBI Washington", commonName: "FBI华盛顿" },
            { id: 151, name: "Washington", commonName: "华盛顿" },
            { id: 175, name: "Admiral", commonName: "上将" },
            { id: 196, name: "Glendale", commonName: "格伦代尔" },
            { id: 197, name: "Oceanic", commonName: "海洋" },
            { id: 204, name: "Hermes", commonName: "赫尔墨斯" },
            { id: 222, name: "Greenwood", commonName: "格林伍德" }
        ],
        
        // 两门车
        twoDoor: [
            { id: 131, name: "Idaho", commonName: "爱达荷" },
            { id: 140, name: "Manana", commonName: "玛娜娜" },
            { id: 149, name: "Esperanto", commonName: "世界语" },
            { id: 169, name: "Stallion", commonName: "种马" },
            { id: 205, name: "Sabre", commonName: "军刀" },
            { id: 206, name: "Sabre Turbo", commonName: "涡轮军刀" },
            { id: 221, name: "Virgo", commonName: "处女座" },
            { id: 226, name: "Blista Compact", commonName: "紧凑型" }
        ],
        
        // 越野车/SUV
        offroad: [
            { id: 130, name: "Landstalker", commonName: "陆地行者" },
            { id: 154, name: "BF Injection", commonName: "BF喷射" },
            { id: 200, name: "Patriot", commonName: "爱国者" },
            { id: 219, name: "Rancher", commonName: "牧场主" },
            { id: 220, name: "FBI Rancher", commonName: "FBI牧场主" },
            { id: 225, name: "Sandking", commonName: "沙王" }
        ],
        
        // 货车
        vans: [
            { id: 143, name: "Pony", commonName: "小马" },
            { id: 148, name: "Moonbeam", commonName: "月光" },
            { id: 158, name: "Securicar", commonName: "运钞车" },
            { id: 170, name: "Rumpo", commonName: "朗波" },
            { id: 179, name: "Gang Burrito", commonName: "帮派卷饼" },
            { id: 186, name: "Yankee", commonName: "扬基" },
            { id: 189, name: "Top Fun", commonName: "顶级乐趣" },
            { id: 212, name: "Burrito", commonName: "卷饼" },
            { id: 213, name: "Spand Express", commonName: "快速运输" }
        ],
        
        // 卡车
        trucks: [
            { id: 133, name: "Linerunner", commonName: "班车" },
            { id: 144, name: "Mule", commonName: "骡子" },
            { id: 163, name: "Barracks OL", commonName: "军营" },
            { id: 173, name: "Packer", commonName: "打包工" },
            { id: 185, name: "Flatbed", commonName: "平板车" },
            { id: 208, name: "Walton", commonName: "沃尔顿" }
        ],
        
        // 出租车
        taxis: [
            { id: 150, name: "Taxi", commonName: "出租车" },
            { id: 168, name: "Cabbie", commonName: "的哥" },
            { id: 188, name: "Zebra Cab", commonName: "斑马出租" },
            { id: 216, name: "Kaufman Cab", commonName: "考夫曼出租" }
        ],
        
        // 特殊车辆
        special: [
            { id: 137, name: "Firetruck", commonName: "消防车" },
            { id: 138, name: "Trashmaster", commonName: "垃圾车" },
            { id: 146, name: "Ambulance", commonName: "救护车" },
            { id: 156, name: "Police", commonName: "警车" },
            { id: 157, name: "Enforcer", commonName: "执法者" },
            { id: 162, name: "Rhino", commonName: "坦克" },
            { id: 172, name: "Romero's Hearse", commonName: "灵车" },
            { id: 201, name: "Love Fist", commonName: "爱之拳" },
            { id: 227, name: "Police Maverick", commonName: "警用直升机" },
            { id: 234, name: "Bloodring Banger A", commonName: "血环A" },
            { id: 235, name: "Bloodring Banger B", commonName: "血环B" }
        ],
        
        // 直升机
        helicopters: [
            { id: 155, name: "Hunter", commonName: "阿帕奇" },
            { id: 165, name: "Helicopter", commonName: "直升机" },
            { id: 177, name: "Sea Sparrow", commonName: "海雀" },
            { id: 199, name: "Sparrow", commonName: "麻雀" },
            { id: 217, name: "Maverick", commonName: "小牛" },
            { id: 218, name: "VCN Maverick", commonName: "VCN小牛" },
            { id: 227, name: "Police Maverick", commonName: "警用直升机" }
        ],
        
        // 船只
        boats: [
            { id: 160, name: "Predator", commonName: "掠夺者" },
            { id: 176, name: "Squalo", commonName: "鲨鱼" },
            { id: 182, name: "Speeder", commonName: "快艇" },
            { id: 183, name: "Reefer", commonName: "冷藏船" },
            { id: 184, name: "Tropic", commonName: "热带" },
            { id: 202, name: "Coast Guard", commonName: "海岸警卫" },
            { id: 203, name: "Dinghy", commonName: "小艇" },
            { id: 214, name: "Marquis", commonName: "侯爵" },
            { id: 223, name: "Cuban Jetmax", commonName: "古巴喷气" }
        ],
        
        // 飞机
        planes: [
            { id: 180, name: "Airtrain", commonName: "空中列车" },
            { id: 181, name: "Dodo", commonName: "渡渡鸟" },
            { id: 190, name: "Skimmer", commonName: "滑翔机" }
        ],
        
        // 其他车辆
        others: [
            { id: 134, name: "Perennial", commonName: "多年生" },
            { id: 136, name: "Rio", commonName: "里约" },
            { id: 139, name: "Stretch", commonName: "加长车" },
            { id: 152, name: "Bobcat", commonName: "山猫" },
            { id: 153, name: "Mr. Whoopee", commonName: "冰淇淋车" },
            { id: 161, name: "Bus", commonName: "公交车" },
            { id: 164, name: "Cuban Hermes", commonName: "古巴信使" },
            { id: 167, name: "Coach", commonName: "长途客车" },
            { id: 171, name: "RC Bandit", commonName: "遥控车" },
            { id: 174, name: "Sentinel XS", commonName: "哨兵XS" },
            { id: 178, name: "Pizza Boy", commonName: "披萨车" },
            { id: 187, name: "Caddy", commonName: "球车" },
            { id: 192, name: "Faggio", commonName: "小绵羊" },
            { id: 194, name: "RC Baron", commonName: "遥控男爵" },
            { id: 195, name: "RC Raider", commonName: "遥控袭击者" },
            { id: 209, name: "Regina", commonName: "女王" },
            { id: 215, name: "Baggage Handler", commonName: "行李车" },
            { id: 228, name: "Boxville", commonName: "箱型车" },
            { id: 229, name: "Benson", commonName: "本森" },
            { id: 230, name: "Mesa Grande", commonName: "大台地" },
            { id: 231, name: "RC Goblin", commonName: "遥控精灵" },
            { id: 236, name: "Vice Cheetah", commonName: "罪恶猎豹" }
        ]
    };

    /**
     * 保存游戏
     */
    public static saveGame() {
        Game.ActivateSaveMenu();
    }

    /**
     * 格式化时间戳为年月日格式
     */
    public static formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }

    /**
     * 格式化时间戳为标准日期格式
     */
    public static formatStdDate(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * 格式化时间戳为完整日期时间格式
     */
    public static formatDateTime(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    /**
     * 根据ID获取车辆信息
     */
    public static getVehicleById(id: number): { id: number; name: string; commonName: string } | undefined {
        for (const category in this.VEHICLES) {
            const vehicle = this.VEHICLES[category as keyof typeof this.VEHICLES].find(v => v.id === id);
            if (vehicle) return vehicle;
        }
        return undefined;
    }

    /**
     * 扁平化列表获取所有车辆
     */
    public static getAllVehicles(): { id: number; name: string; commonName: string }[] {
        return Object.values(this.VEHICLES).flat();
    }
}