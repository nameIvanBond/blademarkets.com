import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../api/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  arrayNews = [];

  constructor(private newsApi: NewsService) { }

  ngOnInit(): void {
    this.newsApi.getWidgetNewsState('0,1,2,3,4,5,').subscribe(res => this.arrayNews = res );
  }


}
