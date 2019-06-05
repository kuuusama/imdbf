import { Component, OnInit, Input } from '@angular/core';
import { NetworkService } from '../network.service';
import { Movie } from '../classes/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public mId : string;
  public mMovie: Movie = null;

  constructor(private network: NetworkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.mId = this.route.queryParams._value['id'];
    this.network.getMovieById(this.mId).then(
      movie => {
        this.mMovie = movie;
      }
    )
  }

  public addToList() {
    var itemListJson = localStorage.getItem('myList');
    var movies : Array<Movie> = [];
    if (null != itemListJson) {
      movies = JSON.parse(itemListJson);
    }
    
    var alreadyInArray = movies.find(movie => movie.mImdbID == this.mMovie.mImdbID);
    if (null == alreadyInArray) {
      movies.push(this.mMovie);
      localStorage.setItem('myList', JSON.stringify(movies));
    }
  }
}
