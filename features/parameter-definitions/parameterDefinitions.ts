import {defineParameterType} from "@cucumber/cucumber";
import {Pages} from "../../src/enums/common.enum";

defineParameterType({
    name: 'page',
    regexp: /login|password/,
    transformer: (s: string) => s as Pages
})
