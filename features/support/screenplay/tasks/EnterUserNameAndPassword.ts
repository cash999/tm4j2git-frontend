import { LoginComponent } from '../components/LoginComponent';
import {Task, PerformsActivities, Duration} from '@serenity-js/core';
import {Browser, Click, Enter, Navigate, Wait} from '@serenity-js/protractor';
import {browser, protractor} from "protractor";
import Timeout = NodeJS.Timeout;

//console.log('var: ', process.env.NODE_ENV);
console.log('var: ', process.env.USER);
console.log('var: ', process.env.PW);
console.log(browser.baseUrl);

let loginPassword;
import { exec } from 'child_process';
if(browser.baseUr === 'http://localhost:8080/login') {
  exec('gopass show ats/eazyBI/EazyBI_SA', (err, stdout,stderr) =>{
    if (err) {
      return;
    }
    loginPassword = stdout;
  });
} else {
  loginPassword = 'asde-eriu-afhi-eiuu';
}
export class EnterUserNameAndPassword implements Task {
  performAs(actor: PerformsActivities) {
    return actor.attemptsTo(
      Task.where(`#actor enters a valid user name`,
        //Enter.theValue('enter your username in code before run test').into(LoginComponent.userName),
        Enter.theValue('EazyBI_SA').into(LoginComponent.userName),
      ),
      Task.where(`#actor enters a valid password`,
        // Enter.theValue('enter your password').into(LoginComponent.password),
        Enter.theValue(loginPassword).into(LoginComponent.password),
      ),
      Task.where(`#actor click login button`,
        Click.on(LoginComponent.loginButton)
      )
    )
  }
}

