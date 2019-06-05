import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dspmode } from '../classes/dspmode.enum';
import { Movie } from '../classes/movie';

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

  public deleteFromList() {
    this.Delete.emit(this.mImdbId);
  }

}
