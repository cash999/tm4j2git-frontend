import {contain, Ensure, includes} from '@serenity-js/assertions';
import { WithStage,} from '@serenity-js/core';
import { isPresent, Navigate, Value} from '@serenity-js/protractor';
import { Given, Then, When } from 'cucumber';

import {AddAdministratorByAccount} from "../support/screenplay/tasks/AddAdministrator";
import {AddAdministrators} from "../support/screenplay/components/AddAdministratorComponent";
import {MySyncComponent} from "../support/screenplay/components/MySyncComponent";
import {element} from "protractor";


const addAdministratorByAccount = new AddAdministratorByAccount;

Given(/^(.*) as an administrator is on the TM4J2GIT admin page$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Navigate.to('/admin')
  );
});

When(/^(.*) add a new administrator by account$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    addAdministratorByAccount
  );
});

Then(/^(.*) check the user name is listed in Administrators list$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Ensure.that(AddAdministrators.administratorList, isPresent())
    //Ensure.that(Value(AddAdministrators.administratorListValue = 'hhh')
  );
});
