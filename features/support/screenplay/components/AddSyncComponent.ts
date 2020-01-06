import {Target} from '@serenity-js/protractor';
import {by} from 'protractor';

export class AddSyncComponent {
  static syncTitle = Target.the('sync title input').located(by.id('syncTitle'));
  static selectJiraProject = Target.the('select jira project').located(by.id('tm4jSourceProject'));
  static selectGITProject = Target.the('select GIT project').located(by.id('gitTargetProject'));
  static selectGITRepository = Target.the('select GIT repository').located(by.id('gitTargetRepository'));
  static selectGITReposiooryATS = Target.the('ATS repository').located(by.xpath(
    "//select[@id='gitTargetRepository']/option[@value='tm4j2gitOnlyForTest']"));
  static selectSaveButton = Target.the('click Save button').located(by.id('addSyncSaveButton'))
}
