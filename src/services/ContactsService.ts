import {BaseService} from './BaseService';
import {UserData} from '../common/models/UserData';
import {StringUtils} from "../common/utils/StringUtils";

export class ContactsService extends BaseService {
    private userDataStore: UserData;

    constructor(userDataStore: UserData) {
        super('https://thinking-tester-contact-list.herokuapp.com/');
        this.userDataStore = userDataStore;
    }

    public async register(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        const response = await this.post('/users', userData);
        const token = response.data.token;
        const user = new UserData();
        user.username = userData.firstName;
        user.lastname = userData.lastName;
        user.email = userData.email;
        user.password = userData.password;
        user.token = token ?? "";
        this.userDataStore.setUser(user);
        if (token) {
            this.setToken(token);
        }
        return response;
    }

    public async tryToCreateErrorContact(param: string) {
        const data = {
            firstName: param === "firstname" || param === "both" ? "" : StringUtils.randomizeUsername(),
            lastName:  param === "lastname"  || param === "both" ? "" : StringUtils.randomizeUsername(),
        };
        return await this.post('/contacts', data);
    }

    // public async createContact(contactData: {
    //     firstName: string;
    //     lastName: string;
    //     birthdate: string;
    //     email: string;
    //     phone: string;
    //     street1: string;
    //     street2: string;
    //     city: string;
    //     stateProvince: string;
    //     postalCode: string;
    //     country: string;
    // })
    // {
    //     return await this.post('/contacts', contactData);
    // }

    public async login(credentials: {
        email: string;
        password: string;
    }) {
        const response = await this.post('/users/login', credentials);
        const token = response.data.token;
        this.userDataStore.token = token;
        this.setToken(token); // чтобы axios добавлял токен в заголовки
        return response;
    }

    public async getUserProfile() {
        const response = await this.get('/users/me');
        const data = response.data;

        this.userDataStore.username = data.firstName; // обновляем userDataStore?
        this.userDataStore.lastname = data.lastName;
        this.userDataStore.email = data.email;
        this.userDataStore.id = data._id;

        return response;
    }

    // async updateUser(id: string, userData : any) {
    //     return this.put(`/${id}`, userData);
    // }
    //
    // async deleteUser(id: string) {
    //     return this.delete(`/${id}`);
    // }
}
