import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CanchaDetailPage } from '../cancha-detail/cancha-detail';


@Component({
  selector: 'page-jugador-detail',
  templateUrl: 'jugador-detail.html'
})
export class JugadorDetailPage {
  jugador: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jugador = this.navParams.data;
  }

  goToJugadorDetail(jugador) {
    this.navCtrl.push(CanchaDetailPage, jugador);
  }
}
