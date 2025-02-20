import {Component, OnInit} from '@angular/core';
import {NavService} from '@core/nav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /*statusVideo = true;*/
  constructor(
    public navService: NavService) {
  }
/*
  highlightTile(event, hash) {
    const {[InViewportMetadata]: {entry}, target, visible} = event;
    const video = document.querySelector('video');
    /!*console.log(video);*!/
    if (visible && this.statusVideo){
      this.statusVideo = false;
      video.play();
    }

  }*/


  ngOnInit(): void {
  }






}
