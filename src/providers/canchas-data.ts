import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';


@Injectable()
export class CanchasData {
  data: any;

  constructor(public http: Http, public user: UserData) {}

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('assets/data/data.json').subscribe(res => {
        // we've got back the raw data, now generate the core canchas data
        // and save the data for later reference
        this.data = res.json();
        resolve(this.data);
      });
    });
  }

  getCanchas() {
    return this.load().then(data => {
      

      return data.canchas;
    });
  }

   filterCancha(cancha, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the cancha name than it passes the query test
      queryWords.forEach(queryWord => {
        if (cancha.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this cancha passes the query test
      matchesQueryText = true;
    }

    // if the segement is 'favorites', but cancha is not a user favorite
    // then this cancha does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(cancha.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    cancha.hide = !(matchesQueryText && matchesSegment);
  }



  getJugadores() {
    return this.load().then(data => {
      return data.jugadores.sort((a, b) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getTracks() {
    return this.load().then(data => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().then(data => {
      return data.map;
    });
  }

}
