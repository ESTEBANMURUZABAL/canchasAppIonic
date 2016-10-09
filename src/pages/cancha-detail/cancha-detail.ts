import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-cancha-detail',
  templateUrl: 'cancha-detail.html'
})
export class CanchaDetailPage {
  cancha: any;

  constructor(public navParams: NavParams) {
    this.cancha = navParams.data;
  }
}
