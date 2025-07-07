export class ContactData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    SoP: string;
    PC: string;
    country: string;
    DoB: string;

   constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.phone = "";
        this.address1 = "";
        this.address2 = "";
        this.city = "";
        this.SoP = "";
        this.PC = "";
        this.country = "";
        this.DoB = "";
    }

    public setContact(contact: ContactData) {
        this.firstname = contact.firstname;
        this.lastname = contact.lastname;
        this.email = contact.email;
        this.phone = contact.phone;
        this.address1 = contact.address1;
        this.address2 = contact.address2;
        this.city = contact.city;
        this.SoP = contact.SoP;
        this.PC = contact.PC;
        this.country = contact.country;
        this.DoB = contact.DoB;
    }
}