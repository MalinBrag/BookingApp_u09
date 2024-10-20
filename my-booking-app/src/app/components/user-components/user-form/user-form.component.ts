import { Component, OnInit, Input, Output, EventEmitter, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { DialogFrameService } from '../../../core/services/utilities/dialogframe.service';
import { BreakpointService } from '../../../core/services/utilities/breakpoint.service';
import { Router } from '@angular/router';
import { FormUtils } from '../../../core/services/utilities/form-utils';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() userData: User | null = null;
  @Input() fields: string[] = [];
  @Output() formSubmit = new EventEmitter<{ userId?:string, user: User } | User> (); 
  form!: FormGroup;
  isMobile: boolean = false;
  title: string = '';
  roles = ['Admin', 'User'];
 
  constructor(
    private fb: FormBuilder,
    @Optional() private dialog: DialogFrameService,
    private breakpoint: BreakpointService,
    private router: Router,
    private formUtils: FormUtils,
  ) {}

  setFormTitle(mode: string) {
    switch (mode) {
      case 'register':
        this.title = 'Register';
        break;
      case 'sign-in':
        this.title = 'Sign In';
        break;
      case 'edit':
        this.title = 'Edit User';
        break;
      default:
        this.title = 'User Form';
        break;
    }
  }

  ngOnInit(): void {
    this.breakpoint.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    const mode = this.formUtils.getMode();
    this.setFormTitle(mode);
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.patchFormWithUserData();
    }
  }

  patchFormWithUserData() {
    if (this.userData) {
      this.form.patchValue(this.userData);
    }
  }

  initializeForm(): void {
    const formFields: { [key : string]: [string, ValidatorFn[]] } = {};
    this.fields.forEach(field => {
      formFields[field] = ['', [Validators.required]];
    });
    this.form = this.fb.group(formFields);
    
    if (this.fields.includes('password') && this.fields.includes('password_confirmation')) {
      this.form.setValidators(this.passwordMatchValidator());
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return(control: AbstractControl): null | { [key: string]: boolean } => { 
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
      if (this.userData) {
        this.form.value['id'] = this.userData.id;
        this.formSubmit.emit({ userId: this.userData.id, user: this.form.value });
      } else {
        this.formSubmit.emit(this.form.value);
      }
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

 /* closeForm() {
    this.form.reset();
    this.router.navigate(['']);
  }*/




}
