/* Component to display movie description */

import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { StorageService } from '../storage.service';
import { Movie } from '../classes/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public mId : string; //movie IMDB id
  public mMovie: Movie = null; //Movie description to display

  constructor(private network: NetworkService, private storage: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* Get movie ID from current adress string */
    this.mId = this.route.snapshot.queryParams.id;
    /* Get description from server side */
    this.network.getMovieById(this.mId).then(
      movie => {
        this.mMovie = movie;
      }
    )
  }

  /* Add current movie to local storage */
  public addToList() {
    this.storage.addMovie(this.mMovie);
  }
}
