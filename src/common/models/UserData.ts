export class UserData {
    username: string;
    lastname: string;
    password: string;
    email: string;
    token?: string;
    id: string;

    constructor() {
        this.username = "";
        this.lastname = "";
        this.password = "";
        this.email = "";
        this.token = "";
        this.id = "";
    }

    public setUser(user: UserData) {
        this.username = user.username;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
        this.token = user.token;
        this.id = user.id;
    }
}
