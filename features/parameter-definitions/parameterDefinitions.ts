import {defineParameterType} from "@cucumber/cucumber";
import {Pages} from "../../src/enums/common.enum";

defineParameterType({
    name: "page",
    regexp: /Login|Registration|Contact|ContactsList/,
    transformer: (pageName: string) => pageName as Pages
});
