import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  Inject,
  OnDestroy, PLATFORM_ID,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {NavService} from '@core/nav.service';
import {DOCUMENT, getLocaleDirection} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DialogShowDataComponent} from '@view/widget/dialog-show-data/dialog-show-data.component';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-layout-manuals',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebLayoutComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('sidenav') appDrawer: ElementRef;
  @ViewChild(MatSidenavContainer) public readonly sidenavContainer: MatSidenavContainer;
  @ViewChild(MatSidenavContent) contentSrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, {read: ElementRef}) public readonly contentElement: ElementRef;

  public theme = 'my-light-theme';
  public localesList: any;
  public currentKey: any;
  public showPrivacy = true;
  // sanitizer.bypassSecurityTrustUrl('/'+)
  constructor(@Inject(DOCUMENT) public document: any,
              @Inject(PLATFORM_ID) public platformId: any,
              private cookieService: CookieService,
              private renderer: Renderer2,
              private scrollDispatcher: ScrollDispatcher,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              public navService: NavService) {
    // light dark theme
    this.renderer.addClass(this.document.body, this.theme);
    if (platformId === 'server') {
      this.renderer.addClass(this.document.body, 'loading');
    }else{
      this.renderer.removeClass(this.document.body, 'loading');
    }
    const direction = getLocaleDirection(this.navService.locale); // 'rtl' or 'ltr'
    // this.renderer.addClass(this.document.body, direction);

    const tmp = navService.localesList.filter(item => item.code !== navService.locale);
    this.localesList = tmp[0];

    this.showPrivacy =  !this.cookieService.check('showPrivacy');


  //  console.log('#########', this.document.body, direction , this.document.documentElement.lang); // .documentElement.lang
   // this.renderer.setAttribute(this.document.firstElementChild, 'dir', direction);
  }
  pcUrl = this.navService.env.pcUrl;

  ngOnInit(): void{
    this.route.queryParams.subscribe((queryParam) => {
      if (queryParam.notice === 'restricted' && this.navService.platformId === 'browser'){
        this.dialog.open(DialogShowDataComponent);
      }

    });
  }

  ngAfterViewInit() {

    // initialization navService
    this.navService.appDrawer = this.appDrawer;
    this.navService.appDrawerContentElement = this.contentElement;
    this.navService.appDrawerContentScrollable = this.contentSrollable;
    // subscribe
    this.scrollDispatcher.scrolled()
      .subscribe(event => {
        this.navService.appDrawerContentScrolledCb(event);
      });
  }
  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, this.theme);
  }
  login() {
    alert('login');
  }

  closePrivacy() {
    this.showPrivacy = false;
    this.cookieService.set('showPrivacy', 'false');
  }


}


