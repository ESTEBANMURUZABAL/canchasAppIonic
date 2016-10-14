import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
import moment from 'moment';

import { CanchasData } from '../../providers/canchas-data';
import { JugadoresFilterPage } from '../canchas-filter/canchas-filter';
import { CanchaDetailPage } from '../cancha-detail/cancha-detail';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-canchas',
  templateUrl: 'canchas.html'
})
export class CanchasPage {
  // the list is a child of the canchas page
  // @ViewChild('canchasList') gets a reference to the list
  // with the variable #canchasList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('canchasList', {read: List}) canchasList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions: any = [];
  canchas = [];

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: CanchasData,
    public user: UserData
  ) {

  }

  ionViewDidEnter() {
    this.app.setTitle('Canchas');
  }

  ngAfterViewInit() {
    this.updateCanchas();
  }

  updateCanchas() {
    // Close any open sliding items when the canchas updates
    this.canchasList && this.canchasList.closeSlidingItems();

    this.confData.getCanchas().then(data => {
  
      this.chanchas = data.canchas;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(JugadoresFilterPage, this.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateCanchas();
      }
    });

  }

  goToCanchaDetail(cancha) {
    this.navCtrl.push(CanchaDetailPage, cancha);
  }

  addFavorite(slidingItem: ItemSliding, sessionData) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData, title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateCanchas();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
