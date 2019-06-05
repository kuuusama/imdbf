/* Component to show one search result or one user list item */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() mTitle: string;
  @Input() mYear : string;
  @Input() mPoster : string;
  @Input() mImdbId : string;
  @Input() mDisplayMode : Dspmode;
  @Output() Delete: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /* Delete movie from user own list */
  public deleteFromList() {
    /* Send delete event to parent component */
    this.Delete.emit(this.mImdbId);
  }

}
