import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import * as moment from 'moment/moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input()
  form: FormGroup;
  @Input()
  controlName = 'date';

  @Input()
  title = 'Date';
  @Input()
  idName = 'date';
  @Input()
  disabled = false;
  @Input()
  placement = 'bottom';

  @Input()
  placeholder = 'DD/MM/YYYY';

  @Input()
  minDate = moment('1753-01-01', 'YYYY-MM-DD').toDate();
  @Input()
  maxDate = moment('2099-01-01', 'YYYY-MM-DD').toDate();

  bsValue;
  mask = '00/00/0000';

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(localeService: BsLocaleService) {
    localeService.use('pt-br');
    const containerClass = 'theme-dark-blue';
    const minDate = this.minDate;
    const maxDate = this.maxDate;
    const dateInputFormat = this.placeholder;
    const showWeekNumbers = false;
    this.bsConfig = { containerClass, minDate, maxDate, dateInputFormat, showWeekNumbers };
  }
}
