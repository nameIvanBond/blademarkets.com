import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavService} from '@core/nav.service';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '@core/loader.service';


@Component({
  selector: 'app-trading-conditions',
  templateUrl: './holidays-schedule.component.html',
  styleUrls: ['./holidays-schedule.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class HolidaysScheduleComponent implements OnInit {


  nameHolidays: any;
  arrayHoliday: any;
  holidaysTitle: any;
  countHolidays: number;
  arrayList = [
    'FX',
    'EQs & ETFs',
    'Index CFDs',
    'Europe 50',
    'France 40',
    'Germany 30',
    'UK FTS 100',
    'Japan 225',
    'US SP 500',
    'US NASQ 100',
    'DJ 30',
    'Commodity CFDs',
    'US Crude Oil',
    'Gold / Platinum',
    'Silver',
  ];

  constructor(public nav: NavService,
              private http: HttpClient,
              public loader: LoaderService) {
  }

  ngOnInit(): void {
    this.loader.show();
    this.http.get(
      this.nav.env.apiUrl + '/api/getholidays.html'
    ).subscribe((obj: any) => {
      this.loader.hide();
      const arrayHolidays = [];
      const nameHolidays = obj.name_holidays;
      const countHolidays = obj.name_holidays.length;
      const holidaysTitle = obj.title;
      Object.keys(obj.holidays).forEach((key) => {
        const values = obj.holidays[key];
        arrayHolidays.push({k: key, v: values});
      });
      this.nameHolidays = nameHolidays;
      this.arrayHoliday = arrayHolidays;
      this.holidaysTitle = holidaysTitle;
      this.countHolidays = countHolidays + 1;
      // console.log(this.arrayHoliday);
      // console.log(this.countHolidays);
    });


  }


}




