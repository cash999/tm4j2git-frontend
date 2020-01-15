import {Target} from '@serenity-js/protractor';
import {by} from 'protractor';

export class AddAdministrators {
  static addAdministrator = Target.the('Add a new administrator by account').located(by.id('addAdministrator'));
  static addAdministratorButton = Target.the('Add Admin User button').located(by.buttonText('Add Admin User'));
  static administratorList = Target.the('Administrator list').located(by.id('setAdministrator'));
  // static administratorListValue = Target.the('Administrator list value').located(by.xpath("//select[@id='setAdministrator']/option[@value='TestAdministrator']"));
}
