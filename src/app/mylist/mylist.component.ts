/* Component to display user own list */

import { Component, OnInit } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';
import { Movie } from '../classes/movie';

@Component({
  selector: 'mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  /* Set list display mode */
  public mDisplayMode: Dspmode = Dspmode.Card; //Display list items as cards
  public mMovies: Array<Movie> = null; //User own movie array

  constructor() { }

  ngOnInit() {
    /* Read list from local storage as JSON string */
    var itemListJson = localStorage.getItem('myList');
    if (null != itemListJson) {
      /* Restore list from JSON string */
      this.mMovies = JSON.parse(itemListJson);
    }
  }

  /* Delete movie object from local stored array */
  public clbOnDelete($id) {
    /* Remove movie from list */
    this.mMovies = this.mMovies.filter(obj => obj.mImdbID !== $id);
    /* Store updated list in local storage */
    localStorage.setItem('myList', JSON.stringify(this.mMovies));
  }
}
