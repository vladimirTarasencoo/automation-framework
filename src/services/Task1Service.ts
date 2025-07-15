import { BaseService } from './BaseService';

export class Task1Service extends BaseService {
    constructor() {
        super('https://thinking-tester-contact-list.herokuapp.com/');
    }

    public async register(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        return this.post('/addUser', userData);
    }

    public async login(credentials: {
        email: string;
        password: string;
    }) {
        return this.post('/login', credentials);
    }



    public async getUserProfile() {
        return this.get('');
    }


    async getUser(id: string) {
        return this.get(`/${id}`);
    }

    async updateUser(id: string, userData : any) {
        return this.put(`/${id}`, userData);
    }

    async deleteUser(id: string) {
        return this.delete(`/${id}`);
    }
}