import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roslovets';
  lang$: Observable<any>;

  constructor(
    private langService: LangService
  ) {
    this.lang$ = this.langService.init();
  }

}
