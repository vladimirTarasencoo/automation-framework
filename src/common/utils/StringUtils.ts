export class StringUtils {
    static generateRandomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static randomizeUsername() {
        return `user_${this.generateRandomString(10)}`;
    }

    static randomizePassword() {
        return `pW_${this.generateRandomString(5)}`;
    }

    static randomizeEmail() {
        return `${this.generateRandomString(6).toLowerCase()}@mail.com`;
    }

    static randomizePhone(): string {
        const digits = '0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return result;
    }
}
