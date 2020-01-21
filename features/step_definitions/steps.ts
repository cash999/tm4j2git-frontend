import { Ensure } from '@serenity-js/assertions';
import { WithStage,} from '@serenity-js/core';
import { isPresent, Navigate } from '@serenity-js/protractor';
import { Given, Then, When } from 'cucumber';
import { EnterUserNameAndPassword } from '../support/screenplay/tasks/EnterUserNameAndPassword';
import { MySyncComponent } from "../support/screenplay/components/MySyncComponent";
import {AddSync} from "../support/screenplay/tasks/AddSync";
//import {AddSyncComponent} from "../support/screenplay/components/AddSyncComponent";
//import {NavigateTo} from "../support/screenplay/tasks/NavigateTo";

const enterUserNameAndPassword = new EnterUserNameAndPassword;
const addSync = new AddSync;
//const navigateTo  = new NavigateTo;

Given(/^(.*) decides to use TM4J2GIT Synchronizer$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Navigate.to('/login'),
  );
});

When(/^(.*) enters user name and password$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    enterUserNameAndPassword
  )
});

Then(/^(.*) should see the synchronisation task$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Ensure.that(MySyncComponent.tableIsVisible, isPresent()),
    //Navigate.to('/'),
    //Navigate.to('/logout')
  );
});

Given(/^(.*) is logged into the application$/, function async(this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Navigate.to('/login'),
    enterUserNameAndPassword,
    Ensure.that(MySyncComponent.tableIsVisible, isPresent())
  )
});

Given(/^(.*) is on the Add Sync page$/, function  (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    Navigate.to('/addSync'),
    //Ensure.that(AddSyncComponent.selectGITProject, isPresent())
  );
});

When(/^(.*) enter a new Sync$/, function (this: WithStage, actorName: string) {
  return this.stage.theActorCalled(actorName).attemptsTo(
    addSync
  )
});




