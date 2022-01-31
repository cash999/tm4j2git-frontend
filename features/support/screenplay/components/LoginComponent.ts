import {Target} from '@serenity-js/protractor';
import {by} from 'protractor';

export class LoginComponent {

  //static loginNavigationLink = Target.the('login submit button').located(by.id('loginSubmitButton'));
  static loginNavigationLink = Target.the('ATS repository').located(by.xpath(
  '//*//ul[@class="nav nav-pills"]/li/a[contains(text(),"(ATS)")]/..'));

   //"//a[@class='nav nav-pills' and starts-with(@href, '/login')]"));
  //"//select[@id='gitTargetRepository']/option[@value='tm4j2gitOnlyForTest']"));



  static userName = Target.the('user name input').located(by.id('user'));
  static password = Target.the('password input').located(by.id('password'));
  static loginButton = Target.the('login submit button').located(by.id('loginSubmitButton'))
}
