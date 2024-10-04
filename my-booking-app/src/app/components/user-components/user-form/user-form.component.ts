import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() fields: string[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;
 
  constructor(
    private builder: FormBuilder,
  ) {}


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const group: { [key : string]: any } = {};
    this.fields.forEach(field => {
      group[field] = ['', Validators.required];
    });
    this.form = this.builder.group(group);

    if (this.fields.includes('password') && this.fields.includes('confirmPassword')) {
      this.form.setValidators(this.passwordMatchValidator());
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return(control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('password_confirmation');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }
      return null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      if (this.form.errors?.['passwordMismatch']) {
        window.alert('Passwords do not match');
      }
    }
  }




}
