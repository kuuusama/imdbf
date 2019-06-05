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
  @Output() Delete: EventEmitter<string> = new EventEmitter();

  mCurrentClass: string = "simple";

  constructor() { }

  public clbOnDelete(event) {
    this.Delete.emit(event);
  }

  ngOnInit() {
    this.mCurrentClass = (this.mDisplayMode == Dspmode.Card ? "cards" : "simple");
  }

}
