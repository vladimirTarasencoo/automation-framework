export class UserData {
    username: string;
    lastname: string;
    password: string;
    email: string;

    constructor() {
        this.username = "";
        this.lastname = "";
        this.password = "";
        this.email = "";
    }

    public setUser(user: UserData) {
        this.username = user.username;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
    }
}

