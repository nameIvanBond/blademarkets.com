import {Component, OnInit, Renderer2} from '@angular/core';
import {InViewportMetadata} from '@core/in-viewport.directive';


@Component({
  selector: 'app-for-partners',
  templateUrl: './for-partners.component.html',
  styleUrls: ['./for-partners.component.scss']
})
export class ForPartnersComponent implements OnInit {

  productList: any;

  constructor(
    private renderer: Renderer2) {
  }


  ngOnInit(): void {
  }


  highlightTile(event, hash) {
    const {[InViewportMetadata]: {entry}, target, visible} = event;

    const addClass = visible ? 'active_animate' : 'inactive';
    this.renderer.addClass(target, addClass);

    const rmClass = visible ? 'inactive' : 'active_animate';
    this.renderer.removeClass(target, rmClass);
  }



}
