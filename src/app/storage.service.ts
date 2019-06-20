import { Injectable } from '@angular/core';
import { Movie } from './classes/movie';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static UserOwnList: Array<Movie> = null; //User own movie array
  private static DeleteListeners: Array<Function> = [];

  public subscribeToDeleteEvent(func: Function) {
    StorageService.DeleteListeners.push(func);
  }

  public getMovieList() : Array<Movie> {
    if (!StorageService.UserOwnList || 0 == StorageService.UserOwnList.length) {
      this.loadList();
    }
    return StorageService.UserOwnList;
  }

  public deleteMovie($id) {
    /* Remove movie from list */
    StorageService.UserOwnList = StorageService.UserOwnList.filter(obj => obj.mImdbID !== $id);
    /* Store updated list in local storage */
    this.saveList();

    /* Call all delete event listeners */
    StorageService.DeleteListeners.forEach(func => {
      func();
    });
  }

  /* Add current movie to local storage */
  public addMovie(movie: Movie) {  
    /* If movie is already in array just do nothing */
    var alreadyInArray = StorageService.UserOwnList.find(mv => mv.mImdbID == movie.mImdbID);
    if (null == alreadyInArray) {
      StorageService.UserOwnList.push(movie);
      this.saveList();
    }
  }

  private saveList() {
    localStorage.setItem('myList', JSON.stringify(StorageService.UserOwnList));
  }

  private loadList() {
    /* Read list from local storage as JSON string */
    var itemListJson = localStorage.getItem('myList');
    if (null != itemListJson) {
      /* Restore list from JSON string */
      StorageService.UserOwnList = JSON.parse(itemListJson);
    } else {
      StorageService.UserOwnList = [];
    }    
  }

  constructor() {
    this.loadList();
  }
}
