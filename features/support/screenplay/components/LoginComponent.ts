import {Target} from '@serenity-js/protractor';
import {by} from 'protractor';

export class LoginComponent {
  static userName = Target.the('user name input').located(by.id('user'));
  static password = Target.the('password input').located(by.id('password'));
  static loginButton = Target.the('login submit button').located(by.id('loginSubmitButton'))
}
