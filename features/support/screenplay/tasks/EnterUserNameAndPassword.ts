import { LoginComponent } from '../components/LoginComponent';
import {Task, PerformsActivities, Duration} from '@serenity-js/core';
import {Browser, Click, Enter, Navigate, Wait} from '@serenity-js/protractor';
import {browser, protractor} from "protractor";
import Timeout = NodeJS.Timeout;

let loginPassword;
let loginUser;
import { exec } from 'child_process';
if(browser.baseUrl === 'http://localhost:8080/login') {
  exec('gopass show ats/TestServiceAccount/SA-PF00-ATS', (err, stdout,stderr) =>{
    if (err) {
      return;
    }
    loginUser = 'SA-PF00-ATS';
    loginPassword = stdout;
  });
} else {
  console.log('from Jenkins');
  let userSplit = process.env.TEST_USER.split(':');
  loginUser = userSplit[0];
  loginPassword = userSplit[1];
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
        Enter.theValue('asde-eriu-afhi-eiuu').into(LoginComponent.password),
      ),
      Task.where(`#actor click login button`,
        Click.on(LoginComponent.loginButton)
      )
    )
  }
}

