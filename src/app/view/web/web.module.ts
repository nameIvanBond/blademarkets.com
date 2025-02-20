import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {AppFormModule} from '@view/form/appForm.module';

import { HomeComponent } from '@view/web/home/home.component';
import { AboutComponent } from '@view/web/about/about.component';
import { ForTradersComponent } from '@view/web/for-traders/for-traders.component';
import { ForPartnersComponent } from '@view/web/for-partners/for-partners.component';
import { PlatformComponent } from '@view/web/eforex/platform.component';
import { MobileTradingComponent } from '@view/web/mobile-trading/mobile-trading.component';
import {DepositComponent} from '@view/web/deposit/deposit.component';
import {SkrillComponent} from '@view/web/skrill/skrill.component';
import {CashuComponent} from '@view/web/cashu/cashu.component';
import {GlobepayComponent} from '@view/web/globepay/globepay.component';
import {NetellerComponent} from '@view/web/neteller/neteller.component';
import {IbComponent} from '@view/web/ib/ib.component';
import {WlComponent} from '@view/web/wl/wl.component';
import {OmnibusComponent} from '@view/web/omnibus/omnibus.component';
import {LiquidityComponent} from '@view/web/liquidity/liquidity.component';
import {MoneyManagerComponent} from '@view/web/money-manager/money-manager.component';
import {TradingConditionsComponent} from '@view/web/trading-conditions/trading-conditions.component';
import {LegalDocumentsComponent} from '@view/web/legal-documents/legal-documents.component';
import {EducationComponent} from '@view/web/education/education.component';
import {EconomicCalendarComponent} from '@view/web/economic-calendar/economic-calendar.component';
import {HolidaysScheduleComponent} from '@view/web/holidays-schedule/holidays-schedule.component';
import {TradersPcComponent} from '@view/web/traders-pc/traders-pc.component';
import {PartnersPcComponent} from '@view/web/partners-pc/partners-pc.component';

import {ContactUsComponent} from '@view/web/contact-us/contact-us.component';
import {ViewModule} from '@view/view.module';
import {NewsComponent} from './news/news.component';
import {NewsOneComponent} from './news-one/news-one.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FaqComponent} from './faq/faq.component';
import {DepositBonusComponent} from '@view/web/deposit-bonus/deposit-bonus.component';
import {AccountClosureComponent} from '@view/web/account-closure/account-closure.component';




@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    DepositBonusComponent,
    TradersPcComponent,
    PartnersPcComponent,
    ForTradersComponent,
    ForPartnersComponent,
    PlatformComponent,
    DepositComponent,
    SkrillComponent,
    MobileTradingComponent,
    CashuComponent,
    GlobepayComponent,
    NetellerComponent,
    EducationComponent,
    EconomicCalendarComponent,
    HolidaysScheduleComponent,
    TradingConditionsComponent,
    IbComponent,
    WlComponent,
    MoneyManagerComponent,
    OmnibusComponent,
    LiquidityComponent,
    LegalDocumentsComponent,
    ContactUsComponent,
    AccountClosureComponent,
    NewsComponent,
    NewsOneComponent,
    FaqComponent,
  ],
  imports: [
    SharedModule,
    AppFormModule,
    //  DragDropModule,
    //  MatExpansionModule,
    ViewModule,
    MatPaginatorModule,
  ]
})
export class WebModule {
}
