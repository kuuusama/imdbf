/* Component to display user own list */

import { Component, OnInit } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';
import { Movie } from '../classes/movie';
import { StorageService } from '../storage.service';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  /* Set list display mode */
  public mDisplayMode: Dspmode = Dspmode.Card; //Display list items as cards
  public mMovies: Array<Movie> = null; //User own movie array

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.mMovies = this.storage.getMovieList();
    var callback = function() {
      this.mMovies = this.storage.getMovieList();
    };
    callback = callback.bind(this);
    this.storage.subscribeToDeleteEvent(callback);
  }
}
