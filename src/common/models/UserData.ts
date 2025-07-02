export class UserData {
    private static instance: UserData;
    username: string;
    lastname: string;
    password: string;
    email: string;

    private constructor() {
        this.username = "";
        this.lastname = "";
        this.password = "";
        this.email = "";
    }

    public static getInstance() {
        if (!UserData.instance) {
            UserData.instance = new UserData();
        }

        return UserData.instance;
    }

    public setUser(user: UserData) {
        this.username = user.username;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
    }
}

