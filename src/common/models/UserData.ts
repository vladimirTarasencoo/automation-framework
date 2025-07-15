export class UserData {
    username: string;
    lastname: string;
    password: string;
    email: string;
    token?: string;

    constructor() {
        this.username = "";
        this.lastname = "";
        this.password = "";
        this.email = "";
        this.token = undefined;
    }

    public setUser(user: UserData) {
        this.username = user.username;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
        this.token = user.token;
    }
}
