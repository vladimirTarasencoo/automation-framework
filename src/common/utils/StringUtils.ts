export class StringUtils {
    static generateRandomString(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
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
        return `${this.generateRandomString(5).toLowerCase()}@mail.com`;
    }
}