import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  // formLogin!: FormGroup;

  // constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  constructor(private router: Router) {}

  navigateToProtected() {
    this.router.navigate(['/protected']);
  }

  // createForm(): void {
  //   this.formLogin = this.formBuilder.group({
  //     email: ['', Validators.required, Validators.email],
  //     password: ['', Validators.required],
  //   });
  // }

  // onSubmit(): void {
  //   console.log(this.formLogin.value);
  // }
}
