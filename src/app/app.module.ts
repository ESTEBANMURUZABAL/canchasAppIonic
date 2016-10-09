import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage, PopoverPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { CanchasPage } from '../pages/canchas/canchas';
import { JugadoresFilterPage } from '../pages/canchas-filter/canchas-filter';
import { CanchaDetailPage } from '../pages/cancha-detail/cancha-detail';
import { SignupPage } from '../pages/signup/signup';
import { JugadorDetailPage } from '../pages/jugador-detail/jugador-detail';
import { JugadoresListPage } from '../pages/jugadores-list/jugadores-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { CanchasData } from '../providers/canchas-data';
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    CanchasPage,
    JugadoresFilterPage,
    CanchaDetailPage,
    SignupPage,
    JugadorDetailPage,
    JugadoresListPage,
    TabsPage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    CanchasPage,
    JugadoresFilterPage,
    CanchaDetailPage,
    SignupPage,
    JugadorDetailPage,
    JugadoresListPage,
    TabsPage,
    TutorialPage
  ],
  providers: [CanchasData, UserData, Storage]
})
export class AppModule {}
