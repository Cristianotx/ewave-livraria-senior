import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

export class FormGroupBase extends FormGroup {
  public hasChanges = false;

  private originalValue: any;

  constructor(
    controls: { [key: string]: AbstractControl },
    validator?: ValidatorFn,
    asyncValidator?: AsyncValidatorFn
  ) {
    super(controls, validator, asyncValidator);
    this.detectValueChanges();
  }

  getRawValue(): any {
    const rawValues = super.getRawValue();
    for (const prop in rawValues) {
      if (rawValues.hasOwnProperty(prop)) {
        if (rawValues[prop] === null || rawValues[prop] === undefined) {
          delete rawValues[prop];
        }
      }
    }
    return rawValues;
  }

  getOriginalValue(control) {
    if (!this.originalValue) {
      return;
    }
    return JSON.parse(this.originalValue)[control];
  }

  private detectValueChanges() {
    this.valueChanges.subscribe((changedValue) => {
      if (this.pristine) {
        this.originalValue = JSON.stringify(this.value);
      } else {
        const currentValue = JSON.stringify(this.value);
        this.hasChanges = this.originalValue !== currentValue;
      }
    });
  }
}
