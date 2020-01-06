import {PerformsActivities, Task} from "@serenity-js/core";
import {Click, Enter, isVisible, Wait} from "@serenity-js/protractor";
import {AddSyncComponent} from "../components/AddSyncComponent";
import {LoginComponent} from "../components/LoginComponent";
import {protractor} from "protractor";

export class AddSync implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a sync title`,
        Enter.theValue('Serenity BDD test').into(AddSyncComponent.syncTitle),
      ),
      Task.where(`#actor focus on ATS Jira project`,
        Click.on(AddSyncComponent.selectJiraProject),
        //Enter.theValue(protractor.Key.ENTER).into(AddSyncComponent.selectJiraProject),
        Wait.until(AddSyncComponent.selectJiraProject, isVisible()),
        Enter.theValue('ATS').into(AddSyncComponent.selectJiraProject),
      ),
      Task.where(`#actor focus on ATS GIT project`,
        Click.on(AddSyncComponent.selectGITProject),
        Wait.until(AddSyncComponent.selectGITProject, isVisible()),
        Enter.theValue('ATS').into(AddSyncComponent.selectGITProject),
      ),
      Task.where(`#actor focus on ATS GIT repository`,
        Click.on(AddSyncComponent.selectGITRepository),
        Enter.theValue('tm4j2gitOnlyForTest').into(AddSyncComponent.selectGITRepository),
      ),
      Task.where(`#actor click save`,
        Click.on(AddSyncComponent.selectSaveButton)
      )
    )
  }
}
