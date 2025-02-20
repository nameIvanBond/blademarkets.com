import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaqService} from '../../../api/faq.service';
import {NavService} from '@core/nav.service';
import {Subscription} from 'rxjs';
import {LoaderService} from '@core/loader.service';



@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

  toggle = false;
  rootMenuView: any;
  rootItems: any;
  header = '';
  currentLocale: any;
  response: any;
  UnPageChange: Subscription;
  pathname = '';
  // test$ = this.faqApi.getTest();
  // <div *ngIf="test$ | async as posts" style="color:red"> 1111111  </div>
  constructor(public nav: NavService, public loader: LoaderService, private faqApi: FaqService) {
  //  this.loader.show();
    this.currentLocale = nav.localesList.filter(item => item.code === nav.locale)[0];
    this.faqApi.getFAQstate('bmfnVT').subscribe(res => {
      this.response = res;
      this.loader.hide();
      this.drawFaq(this.nav.pathname);
    });
  }

  ngOnInit(): void {
    this.UnPageChange = this.nav.pageChange$.subscribe( path => this.drawFaq(path));
  }
  ngOnDestroy(){
     this.UnPageChange.unsubscribe();
     this.loader.hide();
  }

  drawFaq(path){
    if ( this.response !== undefined && this.pathname !== path){
     // console.log(path, this.response);
      this.pathname = path;
      const massCat = [];
      const massIi = [];
      const mch = [];
      this.response.forEach( value => {
        massCat[value.url] = value.parentId;
        massIi[value.url] = value.id;
        if (value.parentId === 0 || value.parentId === '0'){
          mch[value.id] = value.name;
        }
      });
      const rootMenuCat = [];
      const rootMenuIt = [];
      let $n = 1;
      let isSelected = false;
      let j = 1;
      let prId: number;
      this.response.forEach( value => {
        let selected = false;
        if ( this.nav.pathname === value.url){
          selected = true;
        }
        if (massCat[this.nav.pathname] === value.id){
          selected = true;
        }
        if (this.nav.pathname === this.currentLocale.link + 'faq.html' && isSelected === false){
          selected = true;
          prId = value.id;
          isSelected = true;
        }
        if (value.parentId === 0 || value.parentId === '0'){
          rootMenuCat[$n] = {
            id: value.id,
            name: value.name,
            url: value.url,
            parent: value.parentId,
            selected,
            num: $n
          };
          $n++;
        }else{
          rootMenuIt[value.id] = {
            id: value.id,
            name: value.name,
            url: value.url,
            text: value.text,
            parent: value.parentId,
            selected
          };
        }
      });

      if (this.nav.pathname === ''){
        this.header = mch[prId];
      }else{
        if ( mch[massIi[this.nav.pathname]] === undefined){
          this.header = mch[massCat[this.nav.pathname]];
        }else{
          this.header = mch[massIi[this.nav.pathname]];
        }
      }
      const mItem = [];

      rootMenuIt.forEach( value => {
        if ((this.nav.pathname === this.currentLocale.link + 'faq.html'  &&  prId === value.parent)
          || massIi[this.nav.pathname] === value.parent
          || massCat[this.nav.pathname] === value.parent)
        {
          mItem[value.id] = {
            id: value.id,
            name: value.name,
            text: value.text,
            paragraph: j++,
            selected: value.selected,
            url: value.url,
            parent: value.parent
          };

        }
      });
      this.rootMenuView = rootMenuCat.filter(value => value !== null && value !== undefined);
      this.rootItems = mItem.filter(value => value !== null && value !== undefined);
     // console.log('33330', this.rootMenuView, this.rootItems);
      }
  }

}
