import { Component, OnInit, Input, Output, EventEmitter, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { DialogFrameService } from '../../../core/services/dialogframe.service';
import { BreakpointService } from '../../../core/services/breakpoint.service';

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
  isMobile: boolean = false;
  title: string = 'User Form'; //gör om
 
  constructor(
    private builder: FormBuilder,
    @Optional() private dialog: DialogFrameService,
    private breakpoint: BreakpointService,
  ) {}


  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.createForm();
  }

  createForm(): void {
    const formFields: { [key : string]: any } = {};
    this.fields.forEach(field => {
      formFields[field] = ['', Validators.required];
    });
    this.form = this.builder.group(formFields);

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
      this.dialog.closeDialogFrame();
    } else {
      if (this.form.errors?.['passwordMismatch']) {
        window.alert('Passwords do not match');
      }
    }
  }

  closeDialog() {
    this.dialog.closeDialogFrame();
  }




}
