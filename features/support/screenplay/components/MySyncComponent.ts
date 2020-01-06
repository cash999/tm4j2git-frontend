import {Target} from '@serenity-js/protractor';
import {by} from 'protractor';

export class MySyncComponent {
  static tableIsVisible = Target.the('table is available').located(by.className('container'));
}
