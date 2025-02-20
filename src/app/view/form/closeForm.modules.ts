import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoaderService} from '@core/loader.service';
import {NavService} from '@core/nav.service';
import {map} from 'rxjs/operators';
/*import {IProduct, ProductListServices} from '@core/product-list.services';*/


@Component({
  selector: 'app-close-form',
  template: `
    <container-element [ngSwitch]="formState">
      <div class="animate-switch" *ngSwitchCase="'success'">
        <p style="text-align:center;">Thank you, the form has been submitted.</p>
      </div>
      <div *ngSwitchDefault>
        <form class="" [formGroup]="closeGroup" #userFeedbackForm="ngForm" (ngSubmit)="onSubmit()">
          <div fxLayout="row wrap" fxLayoutAlign="space-between start">
            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 1">First Name</mat-label>
              <input type="text" matInput formControlName="firstname" required>
              <mat-error *ngIf="key.firstname.invalid">{{getErrorFirstname()}}</mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 1">Last Name</mat-label>
              <input type="text" matInput formControlName="lastname" required>
              <mat-error *ngIf="key.lastname.invalid">{{getErrorLastname()}}</mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 4">Enter your Email</mat-label>
              <input type="text" matInput formControlName="email" required>
              <mat-error *ngIf="key.email.invalid">{{getErrorEmail()}}</mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 2">Account number</mat-label>
              <input type="text" matInput formControlName="account" required>
              <mat-error *ngIf="key.account.invalid">{{getErrorAccount()}}</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 5">ID number</mat-label>
              <input type="text" matInput formControlName="idnumber" required>
              <mat-error *ngIf="key.idnumber.invalid">{{getErrorIdnumber()}}</mat-error>
            </mat-form-field>

            <!--<mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label i18n="feedbackForm|form label 3">Enter your Phone</mat-label>
              <input type="text" matInput formControlName="phone" required>
              <mat-error *ngIf="key.phone.invalid">{{getErrorPhone()}}</mat-error>
            </mat-form-field>-->


            <mat-form-field appearance="outline" fxFlex="100" fxFlex.gt-sm="30">
              <mat-label>Birthday</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="datepicker" [min]="minDate" [max]="maxDate">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker startView="multi-year" #picker touchUi ></mat-datepicker>
              <mat-error *ngIf="key.datepicker.invalid">{{getErrorDatepicker()}}</mat-error>
            </mat-form-field>




            <mat-form-field appearance="outline" fxFlex="100">
              <mat-label i18n="feedbackForm|form label 6">Your Comment</mat-label>
              <textarea matInput rows="8" formControlName="message" required></textarea>
              <mat-error *ngIf="key.message.invalid">{{getErrorMessage()}}</mat-error>
            </mat-form-field>
            <div fxLayout="row wrap" fxLayoutAlign="end start" fxFlex="100">
              <button [disabled]="loader.loading" class="btn btn_mob btn_blue" i18n="feedbackForm|submit button">SUBMIT FORM</button>
            </div>
          </div>
        </form>
      </div>
    </container-element>
  `,




})
export class CloseFormComponent {
  formState = 'default';
  @Input() formType: string;
  public fT: string;

  minDate: Date;
  maxDate: Date;



  /*servicesTitle: any;*/
  closeGroup = this.fb.group({
    firstname: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[^\n<>]{2,100}$/)
      ]
    ],
    lastname: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[^\n<>]{2,100}$/)
      ]
    ],
    idnumber: ['',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s_-]{2,30}$/),
        Validators.minLength(2),
        Validators.maxLength(30),
      ]
    ],
    account: ['',
      [
        Validators.required,
        Validators.pattern(/^[0-9\s_-]{2,30}$/),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    ],
    message: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500),
        Validators.pattern(/^[^\n<>]{2,500}$/)
      ]
    ],
    email: ['',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ),
        Validators.maxLength(100)
      ]
    ],
    /* phone: ['', [
       Validators.required,
       Validators.pattern(/^[0-9+-\\s]{5,22}$/)
     ]],*/
    datepicker: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]],

  });

  get key() {
    return this.closeGroup.controls;
  }

  constructor(
    public nav: NavService,
    private fb: FormBuilder,
    private http: HttpClient,
    public loader: LoaderService
    /*public product: ProductListServices*/) {
    /* product.loadingProduct$.subscribe((prod: IProduct) => {
       this.servicesTitle = prod.title;
       this.closeGroup.controls.services.setValue(this.servicesTitle);
     });*/
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18 , currentMonth, currentDay);
    /*const date = new Date();
    console.log(date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear());*/
  }

  getErrorFirstname() {
    if (this.key.firstname.errors.required) {
      return $localize`:feedbackForm|error name txt 1:You must enter a value`;
    }
    if (this.key.firstname.errors.minlength) {
      return $localize`:feedbackForm|error name txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.firstname.errors.maxlength) {
      return $localize`:feedbackForm|error name txt 3:This field can be at most 150 characters long.`;
    }
    if (this.key.firstname.errors.pattern) {
      return $localize`:feedbackForm|error name txt 44:Invalid characters <, >`;
    }

    if (this.key.firstname.errors.serverError) {return this.key.firstname.errors.serverError; }
  }

  getErrorLastname() {
    if (this.key.lastname.errors.required) {
      return $localize`:feedbackForm|error name txt 1:You must enter a value`;
    }
    if (this.key.lastname.errors.minlength) {
      return $localize`:feedbackForm|error name txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.lastname.errors.maxlength) {
      return $localize`:feedbackForm|error name txt 3:This field can be at most 150 characters long.`;
    }
    if (this.key.lastname.errors.pattern) {
      return $localize`:feedbackForm|error name txt 44:Invalid characters <, >`;
    }
    if (this.key.lastname.errors.serverError) {return this.key.lastname.errors.serverError; }
  }


  getErrorDatepicker() {
    if (this.key.datepicker.errors.required) {return 'A Birthday is required.'; }
    if (this.key.datepicker.errors.serverError) {return 'Your data has some incorrect value.'; }
  }
  getErrorIdnumber() {
    if (this.key.idnumber.errors.required) {
      return $localize`:feedbackForm|error name txt 1:You must enter a value`;
    }
    if (this.key.idnumber.errors.pattern) {
      return $localize`:feedbackForm|error name txt 11:You should only use letters and numbers`;
    }
    if (this.key.idnumber.errors.minlength) {
      return $localize`:feedbackForm|error name txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.idnumber.errors.maxlength) {
      return $localize`:feedbackForm|error name txt 3:This field can be at most 30 characters long.`;
    }
    if (this.key.idnumber.errors.serverError) {return this.key.idnumber.errors.serverError; }
  }
  getErrorAccount() {
    if (this.key.account.errors.required) {
      return $localize`:feedbackForm|error account txt 1:You must enter a value`;
    }
    if (this.key.account.errors.pattern) {
      return $localize`:feedbackForm|error name txt 11:You should only use numbers`;
    }
    if (this.key.account.errors.minlength) {
      return $localize`:feedbackForm|error account txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.account.errors.maxlength) {
      return $localize`:feedbackForm|error account txt 3:This field can be at most 30 characters long.`;
    }
    if (this.key.account.errors.serverError) {return this.key.account.errors.serverError; }
  }

  getErrorMessage() {
    if (this.key.message.errors.required) {
      return $localize`:feedbackForm|error message txt 1:You must enter a value`;
    }
    if (this.key.message.errors.minlength) {
      return $localize`:feedbackForm|error message txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.message.errors.maxlength) {
      return $localize`:feedbackForm|error message txt 3:This field can be at most 500 characters long.`;
    }
    if (this.key.message.errors.pattern) {
      return $localize`:feedbackForm|error name txt 44:Invalid characters <, >`;
    }

    if (this.key.message.errors.serverError) {return this.key.message.errors.serverError; }
  }

  getErrorEmail() {
    if (this.key.email.errors.required) {
      return $localize`:feedbackForm|error email txt 1:An Email is required.`;
    }
    if (this.key.email.errors.pattern) {
      return $localize`:feedbackForm|error email txt 2:Please enter a valid email address.`;
    }
    if (this.key.email.errors.maxlength) {
      return $localize`:feedbackForm|error email txt 3:This field can be at most 100 characters long.`;
    }
    if (this.key.email.errors.serverError) {return this.key.email.errors.serverError; }
  }

  /*getErrorPhone() {
    if (this.key.phone.errors.required) {
      return $localize`:feedbackForm|error phone txt 1:A phone is required.`;
    }
    if (this.key.phone.errors.pattern) {
      return $localize`:feedbackForm|error phone txt 1:That doesn‘t look like a valid phone.`;
    }
    if (this.key.phone.errors.serverError) {return this.key.phone.errors.serverError; }
  }
*/
  onSubmit() {

    /*  switch (this.formType) {
        case 'money-manager': {
          this.fT = 'Money Manager';
          break;
        }
        case 'contact-us-main': {
          this.fT = 'Contact Us main page';
          break;
        }
        case 'liquidity': {
          this.fT = 'Liquidity';
          break;
        }
        default: {
          this.fT = 'Contact Us';
          break;
        }
      }*/


    // stop here if form is invalid
    if (this.closeGroup.invalid) { return; }
    this.loader.show();

    const body = {
      firstName: this.key.firstname.value,
      lastName: this.key.lastname.value,
      email: this.key.email.value,
      account: this.key.account.value,
      idnumber: this.key.idnumber.value,
      birthday: new Date(this.key.datepicker.value).getMonth() + 1 + '/' + new Date(this.key.datepicker.value).getDate() + '/' + new Date(this.key.datepicker.value).getFullYear(),
      // date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
      message: this.key.message.value,
      formtype: 'EForex Account Closure Form',
      captcha: 'captcha'
      /*phone: this.key.phone.value,*/
    };
    console.log(body);
    this.http.post(this.nav.env.apiUrl + '/service/sendmail-account-closing.html', body) .pipe(map((res: any) => {
      if (res.errors) {throw new HttpErrorResponse({error: res.errors}); }
    }))
      .subscribe((response) => {
          this.loader.hide();
          this.formState = 'success';

          this.closeGroup.reset();
          //  console.log('response', response);
        }, (error) => {
          this.loader.hide();
          this.formState = 'default';
          Object.keys(error.error).forEach(item => {
            if (this.key[item]){
              console.log('serverError', {serverError: error.error[item][0]}, this.key[item]);
              this.key[item].setErrors({serverError: error.error[item][0]});
            }
          });
        }
      );


  }

}
