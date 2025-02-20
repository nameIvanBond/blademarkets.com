import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ErrorComponent} from '@view/general/error/error.component';
import {WebLayoutComponent} from '@view/layout/web-layout/web-layout.component';
import {HomeComponent} from '@view/web/home/home.component';
import {AboutComponent} from '@view/web/about/about.component';
import {ForTradersComponent} from '@view/web/for-traders/for-traders.component';
import {ForPartnersComponent} from '@view/web/for-partners/for-partners.component';
import {MobileTradingComponent} from '@view/web/mobile-trading/mobile-trading.component';
import {PlatformComponent} from '@view/web/eforex/platform.component';
import {DepositComponent} from '@view/web/deposit/deposit.component';
import {SkrillComponent} from '@view/web/skrill/skrill.component';
import {CashuComponent} from '@view/web/cashu/cashu.component';
import {GlobepayComponent} from '@view/web/globepay/globepay.component';
import {NetellerComponent} from '@view/web/neteller/neteller.component';
import {IbComponent} from '@view/web/ib/ib.component';
import {WlComponent} from '@view/web/wl/wl.component';
import {LiquidityComponent} from '@view/web/liquidity/liquidity.component';
import {ContactUsComponent} from '@view/web/contact-us/contact-us.component';
import {OmnibusComponent} from '@view/web/omnibus/omnibus.component';
import {MoneyManagerComponent} from '@view/web/money-manager/money-manager.component';
import {TradingConditionsComponent} from '@view/web/trading-conditions/trading-conditions.component';
import {LegalDocumentsComponent} from '@view/web/legal-documents/legal-documents.component';
import {EducationComponent} from '@view/web/education/education.component';
import {EconomicCalendarComponent} from '@view/web/economic-calendar/economic-calendar.component';
import {HolidaysScheduleComponent} from '@view/web/holidays-schedule/holidays-schedule.component';
import {TradersPcComponent} from '@view/web/traders-pc/traders-pc.component';
import {PartnersPcComponent} from '@view/web/partners-pc/partners-pc.component';
import {DepositBonusComponent} from '@view/web/deposit-bonus/deposit-bonus.component';
import {AccountClosureComponent} from '@view/web/account-closure/account-closure.component';

import {NewsComponent} from '@view/web/news/news.component';
import {NewsOneComponent} from '@view/web/news-one/news-one.component';
import {EmptyLayoutComponent} from '@view/layout/empty-layout/empty-layout.component';

import {FaqComponent} from '@view/web/faq/faq.component';
import {RedirectComponent} from '@view/general/redirect/redirect.component';






const AppRoutes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    data: {
      menu: $localize`:menu|name 1:eForex`,
      title: $localize`:menu|title 1:eForex`,
      description: $localize`:menu|description 1:eForex`,
    },
    children: [
      {
        path: '',
        component: HomeComponent, pathMatch: 'full',
        data: {
          title: $localize`:menu|title 2:eForex: Forex broker serving traders worldwide since 1988 | eForex`,
          description: $localize`:menu|description 2:eForex is the most trusted brokerage worldwide, serving Forex traders since 1988 with the huge number trading platforms, stocks and currencies to choose`,
        }
      },
      {
        path: 'about-us.html',
        component: AboutComponent, pathMatch: 'full',
        data: {
          menu: $localize`:menu|menu 3:About`,
          title: $localize`:menu|title 3:eForex — About`,
          description: $localize`:menu|description 3:eForex — eForex is the most trusted brokerage worldwide, serving Forex traders since 1988 with the huge number trading platforms, stocks and currencies to choose`,
        }
      },

      {
        path: '',
        component: EmptyLayoutComponent,
        data: {
          menu: $localize`:menu|menu 44:For Traders`,
        },
        children: [
          {
            path: 'for-traders.html',
            component: ForTradersComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 4:Overview`,
              title: $localize`:menu|title 4:Forex trader, start your successful trading career now | eForex`,
              description: $localize`:menu|description 4:Make a successful career as a forex trader with eForex, the biggest older world’s local brokerage worldwide. Start your forex trading career now`,
            }
          },
          {
            path: 'trading-conditions.html',
            component: TradingConditionsComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 5:Trading Conditions`,
              title: $localize`:menu|title 5:Forex trading conditions | eForex`,
              description: $localize`:menu|description 5:Forex trading conditions help you to learn on executions, spreads, liquidity and other essential technology to trade forex with confidence`,
            }
          },
          {
            path: 'deposit-bonus.html',
            component: DepositBonusComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu bonus 1:Deposit Bonus`,
              title: $localize`:menu|title bonus 1 5:Deposit Bonus | eForex`,
              description: $localize`:menu|description bonus 1 5:Deposit Bonus`,
            }
          },


          {
            path: 'calendar.html',
            component: EconomicCalendarComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 6:Economic Calendar`,
              title: $localize`:menu|title 6:Economic Calendar | eForex`,
              description: $localize`:menu|description 6:Forex economic calendar will you accurate updates on everything that happening in the Forex trading world`,
            }
          },
          {
            path: 'holidays-schedule.html',
            component: HolidaysScheduleComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 7:Holidays Schedule`,
              title: $localize`:menu|title 7:Forex holidays schedule | eForex`,
              description: $localize`:menu|description 7:Forex holidays schedule for our active traders provide up to date information with events in the financial markets`,
            }
          },
         /* */
        ],
      },
      {
        path: '',
        component: EmptyLayoutComponent,
        data: {
          menu: $localize`:menu|menu 45:For Partners`,
        },
        children: [
          {
            path: 'for-partners.html',
            component: ForPartnersComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 8:Overview`,
              title: $localize`:menu|title 8:Benefits to be an introducing broker | eForex`,
              description: $localize`:menu|description 8:Increate your potential for success in the Forex market and become introducing broker(IB), get rewards for introducing new clients`,
            }
          },
          {
            path: 'introducing-brokers.html',
            component: IbComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 9:Introducing Brokers`,
              title: $localize`:menu|title 9:The process of opening IB account | eForex`,
              description: $localize`:menu|description 9:The simple steps you need to take to create an IB account and what benefits it can bring`,
            }
          },


          {
            path: 'partners-private-cabinet.html',
            component: PartnersPcComponent, pathMatch: 'full',
            data: {
              /*menu: $localize`:menu|menu 3:Private Cabinet`,*/
              title: $localize`:menu|title 10:Private Cabinet for Partners`,
              description: $localize`:menu|description 10:This is private cabinet for our partners`,
            }
          }

        ],
      },
      {
        path: 'platform.html',
        component: PlatformComponent, pathMatch: 'full',
        data: {
          menu: $localize`:menu|menu 11:eForex Platform`,
          title: $localize`:menu|title 11:eForex Platform`,
          description: $localize`:menu|description 11:eForex Platform`,
        }
      },

      {
        path: 'account-closure.html',
        component: AccountClosureComponent, pathMatch: 'full',
        data: {
          title: $localize`:menu|title 122:Account Closure | eForex`,
          description: $localize`:menu|description 122:Account Closure`,
        }
      },




      {
        path: 'forex-news.html',
        component: NewsComponent, pathMatch: 'full',
        data: {
          title: $localize`:menu|title 30:Forex News | eForex`,
          description: $localize`:menu|description 30:Forex News | eForex`,
        }
      },
      {
        path: 'forex-news/:page',
        component: NewsOneComponent, pathMatch: 'full',
        data: {
          title: $localize`:menu|title 31:Forex News | eForex`,
          description: $localize`:menu|description 31:Forex News | eForex`,
        }
      },
      {path: 'error', component: ErrorComponent,
        children: [
          {
            path: 'legal.html',
            component: LegalDocumentsComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 13:Legal`,
              title: $localize`:menu|title 13:Legal`,
              description: $localize`:menu|description 13:eForex, Forex, IB`,
            }
          },
          {
            path: 'omnibus-account.html',
            component: OmnibusComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 14:Omnibus`,
              title: $localize`:menu|title 14:Forex omnibus account | eForex`,
              description: $localize`:menu|description 14:Forex omnibus account is the type of account between two futures brokers, discover your  advantages and tools to setup your own account with eForex`,
            }
          },
          {
            path: 'traders-private-cabinet.html',
            component: TradersPcComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 15:Private Cabinet`,
              title: $localize`:menu|title 15:Your private trading cabinet | eForex`,
              description: $localize`:menu|description 15:Your private trading cabinet | eForex`,
            }
          },
          {
            path: 'webtrader.html',
            component: RedirectComponent, pathMatch: 'full',
            data: {
              externalUrl: 'https://webtrader.bmfn.com/',
              menu: $localize`:menu|menu 16:WebTrader`,
              title: $localize`:menu|title 16:eForex — WebTrader`,
              description: $localize`:menu|description 16:eForex — WebTrader`,
            }
          },
          {
            path: 'faq.html',
            component: FaqComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|name 17:FAQ`,
              title: $localize`:menu|title 17:FAQ`,
              description: $localize`:menu|description 17:FAQ`,
            }
          },
          {
            path: 'faq/:id/:page',
            component: FaqComponent, pathMatch: 'full',
            data: {
              title: $localize`:menu|title 18:FAQ`,
              description: $localize`:menu|description 18:FAQ`,
            }
          },
          {
            path: 'education.html',
            component: EducationComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 19:Education`,
              title: $localize`:menu|title 19:Forex education | eForex`,
              description: $localize`:menu|description 19:Forex education and training materials will help novice and professional traders to understand how to trade and use tools to maximize their profits`,
            }
          },
          {
            path: 'money-management.html',
            component: MoneyManagerComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 20:Money Managers`,
              title: $localize`:menu|title 20:Forex money management | eForex`,
              description: $localize`:menu|description 20:Forex money management is essential tool for traders to control their risks in the uncertain forex markets`,
            }
          },
          {
            path: 'partners-white-label.html',
            component: WlComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 21:White Label`,
              title: $localize`:menu|title 21:Forex white label program | eForex`,
              description: $localize`:menu|description 21:Forex white label program offers business the ability to grow their business and obtain new assets including Forex, stocks, CFD's, commodities or stocks`,
            }
          },
          {
            path: 'clearing-and-liquidity.html',
            component: LiquidityComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 22:Liquidity`,
              title: $localize`:menu|title 22:Forex liquidity and clearing | eForex`,
              description: $localize`:menu|description 22:Forex liquidity and clearing`,
            }
          },
          {
            path: 'contact-us.html',
            component: ContactUsComponent, pathMatch: 'full',
            data: {
              menu: $localize`:menu|menu 12:Contact Us`,
              title: $localize`:menu|title 12:Contact Us, Offices location and more | eForex`,
              description: $localize`:menu|description 12:Contact Forex broker eForex through telephone, email or chat with one of the forex specialist online`,
            }
          },
        ]
      },
      {path: '**', component: ErrorComponent} // otherwise redirect to ErrorComponent
    ]
  },
];

// export class PreloadModules implements PreloadingStrategy {
//
//   preload(route: Route, load: () => Observable<boolean>): Observable<boolean> {
//     if (route.data && route.data.noPreLoad) {
//       return of(null);
//     }
//     return of(true).pipe(delay(2000), switchMap((_: boolean) => load()));
//   }
//
// }
// ExtraOptions - https://angular.io/api/router/ExtraOptions

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
    //  preloadingStrategy: PreloadModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy',
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRouting {
}

