import {Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {RegistrationPage} from "./RegistrationPage";
import {ContactsList} from "./ContactsList";
import {ContactPage} from "./ContactPage";
import {Pages} from "../enums/common.enum";
import {ContactCreatePage} from "./ContactCreatePage";

export const pageFactory = (page: Page, pageName: Pages) => {
    switch (pageName) {
        case Pages.LOGIN:
            return new LoginPage(page);
        case Pages.REGISTRATION:
            return new RegistrationPage(page);
        case Pages.CONTACT:
            return new ContactPage(page);
        case Pages.LIST:
            return new ContactsList(page);
        case Pages.ADD_CONTACT:
            return new ContactCreatePage(page);
        case Pages.EDIT:
            return new ContactPage(page);
        default:
            throw new Error(`Page ${pageName} not found!`);
    }
};
