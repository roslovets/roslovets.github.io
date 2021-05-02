import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LangService } from '../services/lang.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private langService: LangService,
    private dataService: DataService
  ) { }

  allTypes: string[] = [
    'VIDEO.TYPE.PLAYLIST',
    'VIDEO.TYPE.VIDEO',
    'VIDEO.TYPE.STREAM'
  ];
  selectedTypes: string[] = [];
  initTypes: string[];
  queryParams$: Observable<boolean>;
  videos$: Observable<any>;

  showPlaylist: boolean = true;
  showVideo: boolean = true;
  showStream: boolean = true;

  ngOnInit() {
    this.queryParams$ = this.route.queryParams.pipe(
      map((params: any): boolean => {
        let type = params['type'];
        if (type) {
          type = "VIDEO.TYPE." + type.toLocaleUpperCase();
          this.initTypes = this.allTypes.filter(t => t.toLocaleUpperCase() === type);
        }
        return true;
      }),
    );
    this.videos$ = this.dataService.getVideos();
  }

  filterByType(videos: any[]): any[] {
    return videos.filter(video => this.selectedTypes.includes(video.type));
  }

  isSelected() {
    return this.selectedTypes.length > 0;
  }

  isEn(): boolean {
    return this.langService.isEn();
  }

  btnLinkClick(url) {
    window.open(url);
  }

}
