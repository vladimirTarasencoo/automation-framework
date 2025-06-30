import {Given, Then, When} from '@cucumber/cucumber';

import {pageFactory} from "../../src/pages/pageFactory";
import {Pages} from "../../src/enums/common.enum";

Given("user opens {page} page", async function (pageName: Pages) {

    const pageObj = pageFactory(this.page, pageName);

    await pageObj.navigate();
});