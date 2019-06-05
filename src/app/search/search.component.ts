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
  public mOnTypeSearch: boolean = false;
  public mDisplayMode: Dspmode = Dspmode.Link;

  public titles = [];

  private mSearchField: FormControl;
  private mForm: FormGroup;

  constructor(private network: NetworkService, private fb:FormBuilder) {
    this.mSearchField = new FormControl();
    this.mForm = fb.group({search: this.mSearchField});

    this.mSearchField.valueChanges
    .pipe(debounceTime(400))
      .subscribe(term => {
        if (this.mOnTypeSearch) {
          this.doSearch();
        }
      })
  }

  ngOnInit() {
    var item = localStorage.getItem('lastSearch');
    if (null != item) {
      this.mSearchField.setValue(item);
      this.doSearch();
    }
  }

  public doReset() {
    this.mSearchField.setValue('');
    this.mResults = null;
    this.titles = null;
  }

  public doSearch() {
    localStorage.setItem('lastSearch', this.mSearchField.value);
    this.network.searchByTitle(this.mSearchField.value).then(
      result => {
        this.mResults = result;
        this.titles = [];
        if (this.mOnTypeSearch) {
          this.titles = this.mResults.map( function (title) {
            return {
              value: title.mTitle,
              display: title.mTitle
            };
          });
        }

      }
    )
    .catch(reason => {
      console.log(reason);
    });
  }

}
