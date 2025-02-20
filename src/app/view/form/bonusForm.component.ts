import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoaderService} from '@core/loader.service';
import {NavService} from '@core/nav.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-bonus-form',
  template: `
    <container-element [ngSwitch]="formState">
      <div class="animate-switch" *ngSwitchCase="'success'">
        <p style="text-align:center;color:white;" i18n="bonusForm|sent message">Thank you, your message has been sent.</p>
      </div>
      <div *ngSwitchDefault>
        <form class="" [formGroup]="FeedBackGroup" #userFeedbackForm="ngForm" (ngSubmit)="onSubmit()">
          <div  fxLayout="row wrap" fxLayoutAlign="space-between start">
            <mat-form-field class="m_t_mob_s" appearance="outline" fxFlex="100" fxFlex.gt-sm="47">
              <mat-label i18n="bonusForm|form label 1">Name</mat-label>
              <input type="text" matInput  formControlName="name"  required>
              <mat-error *ngIf="key.name.invalid">{{getErrorName()}}</mat-error>
            </mat-form-field>
            <mat-form-field class="m_t_mob_s" appearance="outline" fxFlex="100" fxFlex.gt-sm="47">
              <mat-label i18n="bonusForm|form label 2">Enter Account #</mat-label>
              <input type="text" matInput  formControlName="account" >
              <mat-error *ngIf="key.account.invalid">{{getErrorAccount()}}</mat-error>
            </mat-form-field>
            <mat-form-field class="m_t_mob_s" appearance="outline" fxFlex="100" fxFlex.gt-sm="47">
              <mat-label i18n="bonusForm|form label 3">Enter your Phone</mat-label>
              <input type="text" matInput  formControlName="phone" required>
              <mat-error *ngIf="key.phone.invalid">{{getErrorPhone()}}</mat-error>
            </mat-form-field>
            <mat-form-field class="m_t_mob_s" appearance="outline" fxFlex="100" fxFlex.gt-sm="47">
              <mat-label i18n="bonusForm|form label 4">Enter your Email</mat-label>
              <input type="text" matInput  formControlName="email" required>
              <mat-error *ngIf="key.email.invalid">{{getErrorEmail()}}</mat-error>
            </mat-form-field>
            <div fxLayout="row wrap" class="m_t_mob_s" fxLayoutAlign="end start" fxFlex="100" >
              <button [disabled]="loader.loading" class="btn btn_white btn_mob" i18n="bonusForm|submit button">CONFIRM</button>
            </div>
          </div>
        </form>
      </div>
    </container-element>
  `,


})
export class BonusFormComponent {
  formState = 'default';
  FeedBackGroup = this.fb.group({
    name: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],
    account: ['',
      [
        /*Validators.required,*/
        Validators.minLength(2),
        Validators.maxLength(150)
      ]
    ],
    /*  message: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(300)
        ]
      ],*/
    email: ['',
      [
        Validators.email,
        Validators.required,
        Validators.maxLength(150)
      ]
    ],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9+-\\s]{5,22}$/)
    ]],

  });

  get key() {
    return this.FeedBackGroup.controls;
  }

  constructor(
    public nav: NavService,
    private fb: FormBuilder,
    private http: HttpClient,
    public loader: LoaderService) {

  }

  getErrorName() {
    if (this.key.name.errors.required) {
      return $localize`:bonusForm|error name txt 1:You must enter a value`;
    }
    if (this.key.name.errors.minlength) {
      return $localize`:bonusForm|error name txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.name.errors.maxlength) {
      return $localize`:bonusForm|error name txt 3:This field can be at most 150 characters long.`;
    }
    if (this.key.name.errors.serverError) {return this.key.name.errors.serverError; }
  }
  getErrorAccount() {
    if (this.key.account.errors.required) {
      return $localize`:bonusForm|error account txt 1:You must enter a value`;
    }
    if (this.key.account.errors.minlength) {
      return $localize`:bonusForm|error account txt 2:This field can be more 2 characters long.`;
    }
    if (this.key.account.errors.maxlength) {
      return $localize`:bonusForm|error account txt 3:This field can be at most 150 characters long.`;
    }
    if (this.key.account.errors.serverError) {return this.key.account.errors.serverError; }
  }
  getErrorEmail() {
    if (this.key.email.errors.required) {
      return $localize`:bonusForm|error email txt 1:An Email is required.`;
    }
    if (this.key.email.errors.email) {
      return $localize`:bonusForm|error email txt 2:Please enter a valid email address.`;
    }
    if (this.key.email.errors.maxlength) {
      return $localize`:bonusForm|error email txt 3:This field can be at most 150 characters long.`;
    }
    if (this.key.email.errors.serverError) {return this.key.email.errors.serverError; }
  }
  getErrorPhone() {
    if (this.key.phone.errors.required) {
      return $localize`:bonusForm|error phone txt 1:A phone is required.`;
    }
    if (this.key.phone.errors.pattern) {
      return $localize`:bonusForm|error phone txt 2:That doesn‘t look like a valid phone.`;
    }
    if (this.key.phone.errors.serverError) {return this.key.phone.errors.serverError; }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.FeedBackGroup.invalid) { return; }
    this.loader.show();
    const body = {
      name: this.key.name.value,
      email: this.key.email.value,
      phone: this.key.phone.value,
      account: this.key.account.value,
      /*   message: this.key.message.value,*/
      formtype: 'eForex - Bonus Form'
    };
    this.http.post(this.nav.env.apiUrl + '/service/sendmail-api-bonus.html', body)
      .pipe(map((res: any) => {
        if (res.errors) {throw new HttpErrorResponse({error: res.errors}); }
      }))
      .subscribe((response) => {
          this.formState = 'success';
          this.loader.hide();
          this.FeedBackGroup.reset();
          //  console.log('response', response);
        }, (error) => {
          this.loader.hide();
          this.formState = 'default';
          Object.keys(error.error).forEach(item => {
            if (this.key[item]){
              console.log({serverError: error.error[item][0]}, this.key[item]);
              this.key[item].setErrors({serverError: error.error[item][0]});
            }
          });
        }
      );
  }

}
