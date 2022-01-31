import {PerformsActivities, Task} from "@serenity-js/core";
import {Click, Enter, Press} from "@serenity-js/protractor";
import {LoginComponent} from "../components/LoginComponent";

export class NavigateTo implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor click login login navigation`,
        Click.on(LoginComponent.loginNavigationLink)
      )
    )
  }
}
