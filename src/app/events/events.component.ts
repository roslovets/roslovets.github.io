import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private langService: LangService
  ) { }

  typePrefix: string = 'EVENT.TYPE.';
  allTypes: string[] = [
    'EVENT.TYPE.WEBINAR',
    'EVENT.TYPE.SEMINAR'
  ];
  selectedTypes: string[] = [];
  initTypes: string[];
  queryParams$: Observable<boolean>;
  events$: Observable<any>;

  ngOnInit() {
    this.queryParams$ = this.route.queryParams.pipe(
      map((params: any): boolean => {
        let type = params['type'];
        if (type) {
          type = this.typePrefix + type.toLocaleUpperCase();
          this.initTypes = this.allTypes.filter(t => t.toLocaleUpperCase() === type);
        }
        return true;
      }),
    );
    this.events$ = this.dataService.getEvents();
  }

  filterByType(events: any[]): any[] {
    return events.filter(event => this.selectedTypes.includes(event.type));
  }

  isSelected() {
    return this.selectedTypes.length > 0;
  }

  isEn(): boolean {
    return this.langService.isEn();
  }

}
