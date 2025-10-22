import { KeyCode } from '../../.config/enums';

export class Utils {
    /**
     * 保存游戏
     */
    public static saveGame() {
        Game.ActivateSaveMenu();
    }

    /**
     * 格式化时间戳为年月日格式
     * @param timestamp 时间戳
     * @returns 格式化后的日期字符串
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
     * @param timestamp 时间戳
     * @returns 格式化后的日期字符串
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
     * @param timestamp 时间戳
     * @returns 格式化后的日期时间字符串
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
}