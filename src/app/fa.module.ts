import { NgModule } from '@angular/core';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faEnvelope
} from '@fortawesome/free-regular-svg-icons';

import {
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

import {
  faLinkedin,
  faGithub,
  faYoutube,
  faVk,
  faFacebook,
  faTelegram
} from '@fortawesome/free-brands-svg-icons';


@NgModule({
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})

export class FAModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faEnvelope);
    library.addIcons(faExternalLinkAlt);
    library.addIcons(faLinkedin, faGithub, faYoutube, faVk, faFacebook, faTelegram);
  };
}

