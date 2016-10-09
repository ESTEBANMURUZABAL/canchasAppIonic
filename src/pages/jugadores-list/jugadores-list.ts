import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
// import { InAppBrowser } from 'ionic-native';

import { CanchasData } from '../../providers/canchas-data';
import { CanchaDetailPage } from '../cancha-detail/cancha-detail';
import { JugadorDetailPage } from '../jugador-detail/jugador-detail';


@Component({
  selector: 'page-jugadores-list',
  templateUrl: 'jugadores-list.html'
})
export class JugadoresListPage {
  actionSheet: ActionSheet;
  jugadores = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: CanchasData, public config: Config) {
    confData.getJugadores().then(jugadores => {
      this.jugadores = jugadores;
    });
  }

  goToJugadorDetail(jugador) {
    this.navCtrl.push(JugadorDetailPage, jugador);
  }

  goToCanchaDetail(cancha: string) {
    this.navCtrl.push(CanchaDetailPage, cancha);
  }

  goToJugadorTwitter(jugador) {
    // TODO FIX
    // let app = new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
    // app.on('loadstop').subscribe(
    //   (ev) => {
    //     console.log('InAppBrowser loaded!');
    //   });
  }

  openJugadorShare(jugador) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + jugador.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + jugador.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + jugador.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openContact(jugador) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact with ' + jugador.name,
      buttons: [
        {
          text: `Email ( ${jugador.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + jugador.email);
          }
        },
        {
          text: `Call ( ${jugador.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + jugador.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
