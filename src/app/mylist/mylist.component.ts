import { Component, OnInit } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';
import { Movie } from '../classes/movie';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  public mDisplayMode: Dspmode = Dspmode.Card;
  public mMovies: Array<Movie> = null;

  constructor() { }

  ngOnInit() {
    var itemListJson = localStorage.getItem('myList');
    if (null != itemListJson) {
      this.mMovies = JSON.parse(itemListJson);
    }
  }

  public clbOnDelete($id) {
    this.mMovies = this.mMovies.filter(obj => obj.mImdbID !== $id);
    localStorage.setItem('myList', JSON.stringify(this.mMovies));

  }
}
