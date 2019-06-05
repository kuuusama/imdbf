/* A search performing component */

import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from '../classes/movie';
import { NetworkService } from '../network.service';
import { Dspmode } from '../classes/dspmode.enum';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public mResults: Array<Movie> = null;
  public mOnTypeSearch: boolean = false; //Search while typing or not
  /* Set result list display mode */
  public mDisplayMode: Dspmode = Dspmode.Link; //show links to descriptions

  private mSearchField: FormControl;
  public mForm: FormGroup;

  constructor(private network: NetworkService, private fb:FormBuilder) {
    /* Construct search form */
    this.mSearchField = new FormControl();
    this.mForm = fb.group({search: this.mSearchField});

    /* Assighn search field change callback */
    this.mSearchField.valueChanges
    .pipe(debounceTime(400)) //Wait 400 ms and get last search terms
      .subscribe(term => {
        if (this.mOnTypeSearch) {
          /* Doing search while type */
          this.doSearch();
        }
      })
  }

  ngOnInit() {
    /* If last search terms available, restore it and send search query. */
    var item = localStorage.getItem('lastSearch');
    if (null != item) {
      this.mSearchField.setValue(item);
      this.doSearch();
    }
  }

  /* Reset search results and search terms */
  public doReset() {
    /* Clear search field */
    this.mSearchField.setValue('');
    /* Delete previous search results */
    this.mResults = null;
    /* Remove last search terms from local storage */
    localStorage.removeItem('lastSearch');
  }

  /* Search movies by title */
  public doSearch() {
    /* Store last search term in local storage */
    localStorage.setItem('lastSearch', this.mSearchField.value);
    /* Send search query to server side */
    this.network.searchByTitle(this.mSearchField.value).then(
      result => {
        /* Update search results array */
        this.mResults = result;
      }
    )
    .catch(reason => {
      /* Handle an error and show it in console */
      console.log(reason);
    });
  }

}
