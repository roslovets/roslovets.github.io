import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  contentTypes: string[] = [
    'projects',
    'videos',
    'events'
  ];
  langControl: FormControl;
  contentControl: FormControl;

  constructor(
    private location: Location,
    private langService: LangService
  ) { }

  ngOnInit() {
    const content = this.location.path().toString().replace(/^\/+/g, '');
    this.contentControl = new FormControl(content);
    this.langControl = new FormControl(this.langService.getLang());
    this.langControl.valueChanges.pipe(
      mergeMap((lang: string) => {
        return this.langService.setLang(lang);
      }),
    ).subscribe();
  }

  getLangs(): string[] {
    return this.langService.getLangs();
  }

}
