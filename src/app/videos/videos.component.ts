import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LangService } from '../services/lang.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(
    private langService: LangService,
    private dataService: DataService
  ) { }

  videos$: Observable<any>;
  showPlaylist: boolean = true;
  showVideo: boolean = true;
  showStream: boolean = true;

  ngOnInit() {
    this.videos$ = this.dataService.getVideos();
  }

  checkShow(type) {
    switch (type) {
      case 'VIDEO.TYPE.PLAYLIST': return this.showPlaylist;
      case 'VIDEO.TYPE.VIDEO': return this.showVideo;
      case 'VIDEO.TYPE.STREAM': return this.showStream;
      default: return true;
    }
  }

  isEn(): boolean {
    return this.langService.isEn();
  }

  btnLinkClick(url) {
    window.open(url);
  }

}
