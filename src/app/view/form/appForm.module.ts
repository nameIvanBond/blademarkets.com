import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {FeedbackFormComponent} from '@view/form/feedbackForm.component';
import {MatInputModule} from '@angular/material/input';
import {CloseFormComponent} from '@view/form/closeForm.modules';
import {BonusFormComponent} from '@view/form/bonusForm.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    FeedbackFormComponent,
    BonusFormComponent,
    CloseFormComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatButtonToggleModule,
    // MatDatepickerModule,
    // MatCheckboxModule,
    MatInputModule,
    // MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    SharedModule,
    // NgxMatFileInputModule
  ],
  exports: [
    FeedbackFormComponent,
    BonusFormComponent,
    CloseFormComponent
  ]
})
export class AppFormModule {
}
