import { Component, OnInit, Input } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-lang-alert',
  templateUrl: './lang-alert.component.html',
  styleUrls: ['./lang-alert.component.scss']
})
export class LangAlertComponent implements OnInit {

  @Input() langs: string[] = []
  @Input() message: string

  constructor(
    private langService: LangService
  ) { }

  ngOnInit(): void { }

  isLang(): boolean {
    let langs = this.langs.map((lang: string): string => lang.toLowerCase());
    return langs.includes(this.langService.getLang())
  }

}
