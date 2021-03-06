/* Component to display search list results or user own movie list */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../classes/movie';
import { Dspmode } from '../classes/dspmode.enum';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() movieList : Array<Movie>;
  @Input() mDisplayMode : Dspmode;

  /* Set default display style */
  mCurrentClass: string = "simple";

  constructor() { }

  ngOnInit() {
    /* Select list style according to input option */
    this.mCurrentClass = (this.mDisplayMode == Dspmode.Card ? "cards" : "simple");
  }

}
