import { LoginComponent } from '../components/LoginComponent';
import {Task, PerformsActivities, Duration} from '@serenity-js/core';
import {Browser, Click, Enter, Navigate, Wait} from '@serenity-js/protractor';
import {browser, protractor} from "protractor";
import Timeout = NodeJS.Timeout;


export class EnterUserNameAndPassword implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a valid user name`,
        Enter.theValue('enter your username in code before run test').into(LoginComponent.userName),
        // Enter.theValue('tgdlima3').into(LoginComponent.userName),
      ),
      Task.where(`#actor enters a valid password`,
        Enter.theValue('enter your password').into(LoginComponent.password),
        // Enter.theValue('').into(LoginComponent.password),
      ),
      Task.where(`#actor click login button`,
        Click.on(LoginComponent.loginButton)
      )
    )
  }
}

