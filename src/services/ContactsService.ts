import {BaseService} from './BaseService';
import {UserData} from '../common/models/UserData';
import {StringUtils} from "../common/utils/StringUtils";
import {DataTable} from "@cucumber/cucumber";
import {AxiosRequestConfig} from "axios";

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

    public async createContactsFromTable(dataTable: DataTable) {
        const rows = dataTable.hashes();

        for (const row of rows) {
            const contactData = {
                firstName: row.FirstName,
                lastName: row.LastName,
                birthdate: row.DoB || undefined,
                email: row.Email,
                phone: row.Phone || undefined,
                street1: row.Address1,
                street2: row.Address2 || undefined,
                city: row.City || undefined,
                stateProvince: row.SoP || undefined,
                postalCode: row.PostCode || undefined,
                country: row.Country || undefined,
            };
            try {
                const res = await this.post('/contacts', contactData);
                console.log(`Contact created: ${res.data.firstName} ${res.data.lastName}, ${contactData.email}`);
            } catch (error: any) {
                const msg = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
                console.warn(`Contact create error ${contactData.email}: ${msg}`);
            }
        }
    }

    public async getData<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.get<T>(endpoint, config);
        return response.data;
    }

    public async deleteContact(id: string): Promise<any> {
        return await this.delete(`/contacts/${id}`);
    }

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
        console.log("[USER PROFILE DATA]:", data);
        this.userDataStore.username = data.firstName;
        this.userDataStore.lastname = data.lastName;
        this.userDataStore.email = data.email;
        this.userDataStore.id = data._id;
        return data;
    }

    public async updateContactById(id: string, updatedData: any): Promise<any> {
        const current = await this.get(`/contacts/${id}`);
        const fullData = {
            ...current.data,
            ...updatedData
        };
        const response = await this.api.put(`/contacts/${id}`, fullData);
        return response.data;
    }

    // async updateUser(id: string, userData : any) {
    //     return this.put(`/${id}`, userData);
    // }
    //
    // async deleteUser(id: string) {
    //     return this.delete(`/${id}`);
    // }
}
