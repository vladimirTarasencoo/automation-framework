import {defineParameterType} from "@cucumber/cucumber";
import {Pages} from "../../src/enums/common.enum";

defineParameterType({
    name: 'page',
    regexp: /Login|BlaBlaBla/,
    transformer: (s) => s as Pages
})