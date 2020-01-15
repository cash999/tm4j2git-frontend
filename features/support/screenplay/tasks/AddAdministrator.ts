import {AddAdministrators} from '../components/AddAdministratorComponent';
import {Task, PerformsActivities, Duration} from '@serenity-js/core';
import {Browser, Click, Enter, Navigate, Wait} from '@serenity-js/protractor';
import {browser, protractor} from "protractor";
import Timeout = NodeJS.Timeout;

export class AddAdministratorByAccount implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a valid account name`,
        Enter.theValue('TestAdministrator').into(AddAdministrators.addAdministrator)
      ),
      Task.where(`#actor click Add Admin User button`,
        Click.on(AddAdministrators.addAdministratorButton)
      ),
      Task.where(`#actor select new administrator`,
        Enter.theValue('TestAdministrator').into(AddAdministrators.administratorList)
      )
    )
  }
}

