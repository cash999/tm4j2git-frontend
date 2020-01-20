import {contain, Ensure, includes} from '@serenity-js/assertions';
import { WithStage,} from '@serenity-js/core';
import { isPresent, Navigate, isSelected} from '@serenity-js/protractor';
import { Given, Then, When } from 'cucumber';

import {AddAdministratorByAccount} from "../support/screenplay/tasks/administration/AddAdministrator";
import {Administration} from "../support/screenplay/components/AdministrationComponent";

const addAdministratorByAccount = new AddAdministratorByAccount;

// Given(/^(.*) as an administrator is on the TM4J2GIT admin page$/, function (this: WithStage, actorName: string) {
//   return this.stage.theActorCalled(actorName).attemptsTo(
//     Navigate.to('/admin')
//   );
// });
//
// When(/^(.*) add a new administrator by account$/, function (this: WithStage, actorName: string) {
//   return this.stage.theActorCalled(actorName).attemptsTo(
//     addAdministratorByAccount
//   );
// });
//
// Then(/^(.*) check the user name is listed in Administrators list$/, function (this: WithStage, actorName: string) {
//   return this.stage.theActorCalled(actorName).attemptsTo(
//     //Ensure.that(AddAdministrators.administratorList, isPresent())
//     Ensure.that(Administration.administratorListValue, isSelected())
//   );
// });
