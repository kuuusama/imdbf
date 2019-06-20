/* Component to show one search result or one user list item */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';
import { StorageService } from '../storage.service';

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

  constructor(private stroage: StorageService) { }

  ngOnInit() { }

  /* Delete movie from user own list */
  public deleteFromList() {
    this.stroage.deleteMovie(this.mImdbId);
  }

}
