import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../api/news/news.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-news-all',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  arrayNews = [];
  // MatPaginator Inputs
  length = 100;
  pageSize = 36;
  pageSizeOptions: number[] = [36, 60, 90];

  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(private newsApi: NewsService) { }

  ngOnInit(): void {
    const count = this.newsApi.getCountCache(0, 36);
    // console.log('!!!___count', count);
    this.newsApi.getWidgetNews(count).subscribe(res => {
      this.arrayNews = res.map( item => {

        const tmpGallery = JSON.parse(item.gallery);
        for (const k in tmpGallery) {  item.gallery = tmpGallery[k]; }
        /*console.log(tmpGallery);*/
        return item;
      });
   //   console.log(this.arrayNews.sort());
      this.length = this.newsApi.getCount();
    });
  }
  public getPaginatorData(event: PageEvent): PageEvent {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    const count = this.newsApi.getCountCache(start, end);
    this.newsApi.getWidgetNews(count).subscribe(res => {
      this.arrayNews = res.map( item => {

        const tmpGallery = JSON.parse(item.gallery);
        for (const k in tmpGallery) {  item.gallery = tmpGallery[k]; }
        /*console.log(tmpGallery);*/
        return item;
      });
      this.length = this.newsApi.getCount();
    });

    return event;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      /*console.log('=================',this.pageSizeOptions);*/
    }
  }
}
