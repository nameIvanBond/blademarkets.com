import {Component, OnInit, Renderer2} from '@angular/core';
import {InViewportMetadata} from '@core/in-viewport.directive';


@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.scss']
})
export class LiquidityComponent implements OnInit {

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

   // this.BPService.setStatusByHash(hash, visible);

    const rmClass = visible ? 'inactive' : 'active_animate';
    this.renderer.removeClass(target, rmClass);
  }



}
