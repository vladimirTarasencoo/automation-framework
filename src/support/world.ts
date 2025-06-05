// src/support/customWorld.ts
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import pino from "pino"; // or playwright-core if you use that
import logger from '../../logger/pino';

export class CustomWorld extends World {
    //TODO: add more data here
    variable: string; //you can store here everything you want

    constructor(options: IWorldOptions) {
        super(options);
        this.variable = 'hui'
    }

    logger: pino.Logger = logger;
}

setWorldConstructor(CustomWorld);