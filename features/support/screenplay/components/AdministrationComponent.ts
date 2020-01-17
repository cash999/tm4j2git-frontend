import {Target, Text} from '@serenity-js/protractor';
import {by} from 'protractor';

export class Administration {
  static addAdministrator = Target.the('Add a new administrator by account').located(by.id('addAdministrator'));
  static addAdministratorButton = Target.the('Add Admin User button').located(by.id('addAdmin'));
  static administratorList = Target.the('Administrator list').located(by.id('setAdministrator'));
  static administratorListValue = Target.the('Administrator list value').located(by.xpath(
    "//*[@id='setAdministrator']//option[normalize-space() = 'TestAdministrator']"
  ));
}
