import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Customer } from '../customer';

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
}
