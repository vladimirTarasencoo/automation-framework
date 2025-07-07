export class ContactData {
    private static instance: ContactData;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;


    private constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.phone = "";
        this.address = "";
    }

    public static getInstance() {
        if (!ContactData.instance) {
            ContactData.instance = new ContactData();
        }

        return ContactData.instance;
    }

    public setContact(contact: ContactData) {
        this.firstname = contact.firstname;
        this.lastname = contact.lastname;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address = contact.address;
    }
}

