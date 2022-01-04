import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Customer } from '../customer';

// could also just use in-built min and max validators
function ratingRange(c: AbstractControl): { [key: string]: boolean} | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
}

@Component({
  selector: 'ngrf-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customerForm: FormGroup = new FormGroup({});
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],      
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, ratingRange],
      sendCatalog: true
    });
  }

  populateTestData(): void {
    // use setValue when setting all values, patchValue when setting a subset
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jack@torchwood.com',
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
