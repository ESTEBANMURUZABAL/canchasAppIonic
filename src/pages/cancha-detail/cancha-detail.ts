import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cancha-detail',
  templateUrl: 'cancha-detail.html'
})
export class CanchaDetailPage {

  cancha: any;

  constructor(public navParams: NavParams) {
    this.cancha = navParams.data;
 
  }

  goToCanchaMap(cancha) {
    // go to the session detail page
    // and pass in the session data
   
  }


}
