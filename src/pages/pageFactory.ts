import {Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {RegistrationPage} from "./RegistrationPage";
import {ContactsList} from "./ContactsList";
import {ContactPage} from "./ContactPage";
import {Pages} from "../enums/common.enum";
import {ContactCreatePage} from "./ContactCreatePage";

export const pageFactory = (page: Page, pageName: Pages) => {
    switch (pageName) {
        case Pages.Login:
            return new LoginPage(page);
        case Pages.Registration:
            return new RegistrationPage(page);
        case Pages.Contact:
            return new ContactPage(page);
        case Pages.List:
            return new ContactsList(page);
        case Pages.AddContact:
            return new ContactCreatePage(page);
        default:
            throw new Error(`Page ${pageName} not found!`);
    }
};