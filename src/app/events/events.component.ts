import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LangService } from '../services/lang.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private langService: LangService,
    private dataService: DataService
  ) { }

  events$: Observable<any>;
  showSeminar: boolean = true;
  showWebinar: boolean = true;

  ngOnInit() {
    this.events$ = this.dataService.getEvents();
  }

  isEn(): boolean {
    return this.langService.isEn();
  }

  btnLinkClick(url) {
    window.open(url);
  }

  checkShow(type) {
    switch (type) {
      case 'EVENT.TYPE.SEMINAR': return this.showSeminar;
      case 'EVENT.TYPE.WEBINAR': return this.showWebinar;
      default: return true;
    }
  }

}
