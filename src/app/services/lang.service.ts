import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  LANGS: string[] = ['en', 'ru'];
  DEF_LANG: string = 'en';
  LANG_KEY: string = 'lang';
  lang: string = 'en';

  constructor(
    private storage: StorageMap,
    private translate: TranslateService
  ) { }

  init(): Observable<any> {
    this.translate.addLangs(this.LANGS);
    this.translate.setDefaultLang(this.DEF_LANG);
    return this.storage.has(this.LANG_KEY).pipe(
      mergeMap(isLangStored => {
        if (isLangStored) {
          return this.storage.get(this.LANG_KEY).pipe(
            mergeMap((lang: string) => {
              return this.useLang(lang);
            })
          )
        }
        else {
          return of(this.translate.getBrowserLang()).pipe(
            mergeMap((lang: string) => {
              if (!this.LANGS.includes(lang)) {
                lang = this.DEF_LANG;
              };
              return this.setLang(lang);
            }),
          );
        };
      }),
    );
  }

  setLang(lang: string): Observable<string> {
    this.lang = lang;
    return this.useLang(lang).pipe(
      mergeMap(() => {
        return this.storage.set(this.LANG_KEY, lang).pipe(
          map(() => lang),
        )
      }),
    );
  }

  useLang(lang: string): Observable<string> {
    return this.translate.use(lang).pipe(
      map(() => lang),
    );
  }

  getLang(): any {
    return this.translate.currentLang;
  }

  getLangs(): string[] {
    return this.LANGS;
  }

}
