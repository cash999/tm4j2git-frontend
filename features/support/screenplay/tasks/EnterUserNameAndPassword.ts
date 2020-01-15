import { LoginComponent } from '../components/LoginComponent';
import {Task, PerformsActivities, Duration} from '@serenity-js/core';
import {Browser, Click, Enter, Navigate, Wait} from '@serenity-js/protractor';
import {browser, protractor} from "protractor";
import Timeout = NodeJS.Timeout;

console.log("get password from GOPASS");
let loginPassword;
import { exec } from 'child_process';
exec('gopass show ats/eazyBI/EazyBI_SA', (err, stdout,stderr) =>{
  if (err) {
    return;
  }
  loginPassword = stdout;
});

export class EnterUserNameAndPassword implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a valid user name`,
        Enter.theValue('EazyBI_SA').into(LoginComponent.userName),
        // Enter.theValue('xxx').into(LoginComponent.userName),
      ),
      Task.where(`#actor enters a valid password`,
        Enter.theValue(loginPassword).into(LoginComponent.password),
        // Enter.theValue('yyy').into(LoginComponent.password),
      ),
      Task.where(`#actor click login button`,
        Click.on(LoginComponent.loginButton)
      )
    )
  }
}

