import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavService} from '@core/nav.service';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '@core/loader.service';

export interface PeriodicElement {
  symbol: string;
  name: string;
  base?: string;
  quote: string;
  leverage: string;
  lotSize: number;
  minContractSize: number;
  /*pip: number;*/
  trading_intervals?: string;
  schedule: Shedule;
}

export interface Shedule {
  Friday: string;
  Monday: string;
  Saturday: string;
  Sunday: string;
  Thursday: string;
  Tuesday: string;
  Wednesday: string;
}

export interface DataRequest {
  message: {
    forex: [{ data: PeriodicElement, schedule: Shedule }],
    commodities: [{ data: PeriodicElement, schedule: Shedule }],
    equities: [{ data: PeriodicElement, schedule: Shedule }],
    etfs: [{ data: PeriodicElement, schedule: Shedule }],
    fin_in: [{ data: PeriodicElement, schedule: Shedule }]
  };
  succes: string;
}

@Component({
  selector: 'app-trading-conditions',
  templateUrl: './trading-conditions.component.html',
  styleUrls: ['./trading-conditions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class TradingConditionsComponent implements OnInit {

  arrayForex: [PeriodicElement];
  arrayEtfs: [PeriodicElement];
  arrayEquities: [PeriodicElement];
  arrayCommodities: [PeriodicElement];
  arrayIndices: [PeriodicElement];
  BigArray;

  arrayForexHead: any;
  arrayEtfsHead: any;
  arrayEquitiesHead: any;
  arrayCommoditiesHead: any;
  arrayIndicesHead: any;

  columnsToDisplay = [
    'symbol', 'name', 'base', 'quote', 'leverage', 'lotSize', 'minContractSize',  'trading_intervals'
  ];
  /* 'pip', */
  columnsToDisplayNoBase = [
    'symbol', 'name', 'quote', 'leverage', 'lotSize', 'minContractSize', 'trading_intervals'
  ];
  /* 'pip', */
  nameSource = {
    '1Forex': 'Forex',
    '2Indices': 'Indexes',
    '3Equities': 'Equities',
    '4Etfs': 'ETFs',
    '5Commodities': 'Commodities',
  };
  columnsNew = [
    {td: 'symbol', th: 'Symbol'},
    {td: 'name', th: 'Name'},
    {td: 'quote', th: 'Quote'},
    {td: 'leverage', th: 'Leverage'},
    {td: 'lotSize', th: 'Lot Size'},
    {td: 'minContractSize', th: 'Min Contract Size'},
   /* {td: 'pip', th: 'Pip Decimal Points'},*/

    {td: 'trading_intervals', th: 'Trading Intervals'}
  ];


  expandedElement: PeriodicElement | null;

  constructor(public nav: NavService,
              private http: HttpClient,
              public loader: LoaderService) {
  }

  ngOnInit(): void {
    this.loader.show();
    this.http.get(
      this.nav.env.apiUrl + '/api/trading-conditions.html?info=forex&website_=eforex'
    ).subscribe((obj: DataRequest) => {

      Object.entries(obj.message).forEach(([key, values]) => {
        /* console.log(key);*/
        Object.entries(values).forEach(([k, v]) => {
          this.loader.hide();
          if (v.data !== undefined) {
            const tmp = {
              symbol: v.data.symbol,
              name: v.data.name,
              quote: v.data.quote,
              leverage: v.data.leverage,
              lotSize: v.data.lotSize,
              minContractSize: v.data.minContractSize,
              /*pip: v.data.pip,*/

              schedule: {
                Friday: v.schedule.Friday,
                Monday: v.schedule.Monday,
                Saturday: v.schedule.Saturday,
                Sunday: v.schedule.Sunday,
                Thursday: v.schedule.Thursday,
                Tuesday: v.schedule.Tuesday,
                Wednesday: v.schedule.Wednesday
              }
            };

            switch (key) {
              case 'forex': {
                tmp['base'] = v.data.base;
                if (this.arrayForex === undefined) {
                  this.arrayForex = [tmp];
                  this.arrayForexHead = this.columnsNew;
                  this.arrayForexHead.push({td: 'base', th: 'Base'});
                } else {
                  this.arrayForex.push(tmp);
                }
                break;
              }
              case 'etfs': {
                if (this.arrayEtfs === undefined) {
                  this.arrayEtfs = [tmp];
                  this.arrayEtfsHead = this.columnsNew;
                } else {
                  this.arrayEtfs.push(tmp);
                }
                break;
              }
              case 'equities': {
                if (this.arrayEquities === undefined) {
                  this.arrayEquities = [tmp];
                  this.arrayEquitiesHead = this.columnsNew;
                } else {
                  this.arrayEquities.push(tmp);
                }
                break;
              }
              case 'commodities': {
                if (this.arrayCommodities === undefined) {
                  this.arrayCommodities = [tmp];
                  this.arrayCommoditiesHead = this.columnsNew;
                } else {
                  this.arrayCommodities.push(tmp);
                }
                break;
              }
              case 'fin_in': {
                if (this.arrayIndices === undefined) {
                  this.arrayIndices = [tmp];
                  this.arrayIndicesHead = this.columnsNew;
                } else {
                  this.arrayIndices.push(tmp);
                }
                break;
              }
            }

          }
        });
      });

      // console.log(this.arrayForex);
      this.BigArray = {
        '1Forex': {
          td: this.arrayForex,
          th: this.arrayForexHead,
          thBottom: this.columnsToDisplay
        },
        '2Indices': {
          td: this.arrayIndices,
          th: this.arrayIndicesHead,
          thBottom: this.columnsToDisplayNoBase
        },
        '3Equities': {
          td: this.arrayEquities,
          th: this.arrayEquitiesHead,
          thBottom: this.columnsToDisplayNoBase
        },
        '4Etfs': {
          td: this.arrayEtfs,
          th: this.arrayEtfsHead,
          thBottom: this.columnsToDisplayNoBase
        },
        '5Commodities': {
          td: this.arrayCommodities,
          th: this.arrayCommoditiesHead,
          thBottom: this.columnsToDisplayNoBase
        }

      };


    });


  }

}
