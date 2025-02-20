import {Component, OnInit, Renderer2} from '@angular/core';
import {InViewportMetadata} from '@core/in-viewport.directive';

@Component({
  selector: 'app-omnibus',
  templateUrl: './omnibus.component.html',
  styleUrls: ['./omnibus.component.scss']
})
export class OmnibusComponent implements OnInit {

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
