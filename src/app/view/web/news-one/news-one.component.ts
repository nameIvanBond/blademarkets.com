import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {INews, NewsService} from '../../../api/news/news.service';

@Component({
  selector: 'app-news-one',
  templateUrl: './news-one.component.html',
  styleUrls: ['./news-one.component.scss']
})
export class NewsOneComponent implements OnInit {
  public newsURL: string;
  public news: INews;
  public curent: {root: ''};
  public gallery: [];

  constructor(route: ActivatedRoute, private newsApi: NewsService) {
    route.params.subscribe(params => {this.newsURL = params.page.substring(0, params.page.length - 5); });
  }

  ngOnInit(): void {
    this.newsApi.getOneNews(this.newsURL).subscribe( news => {
      this.news = news;
      this.curent = JSON.parse(news.news) ;
      const tmpGallery = JSON.parse(news.gallery);
      for (const k in tmpGallery) { this.gallery = tmpGallery[k]; }
      console.log('news', news);
    });
  }

}
