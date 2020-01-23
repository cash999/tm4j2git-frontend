import {Administration} from '../../components/AdministrationComponent';
import {Task, PerformsActivities} from '@serenity-js/core';
import {Click, Enter} from '@serenity-js/protractor';

export class AddAdministratorByAccount implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a valid account name`,
        Enter.theValue('TestAdministrator').into(Administration.addAdministrator)
      ),
      Task.where(`#actor click Add Admin User button`,
        Click.on(Administration.addAdministratorButton)
      ),
      Task.where(`#actor select new administrator`,
        Enter.theValue('TestAdministrator').into(Administration.administratorList)
      )
    )
  }
}

