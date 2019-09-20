import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // https://angular.io/guide/reactive-forms

  loginForm: FormGroup;
  singleFormControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  formSubmit() {
    // stop here if form is invalid

    if (this.loginForm.invalid) {
      this.loginForm.get('email').markAsDirty();
      this.loginForm.get('email').updateValueAndValidity();
      this.loginForm.get('password').markAsDirty();
      this.loginForm.get('password').updateValueAndValidity();
      return;
    }

    this.homeService.login(this.loginForm.value).subscribe(() => {
      alert('Submited');
    }, () => {
      this.singleFormControl.patchValue(this.loginForm.get('email').value);
      this.loginForm.reset();
      // this.loginForm.get('email').reset();
      // this.loginForm.get('password').reset();
    });

  }

  getFromControlValue() {
    this.loginForm.get('email').patchValue(this.singleFormControl.value, { emitEvent: false });

  }
}
