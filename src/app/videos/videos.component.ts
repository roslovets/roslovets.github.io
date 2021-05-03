import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private langService: LangService
  ) { }

  typePrefix: string = 'VIDEO.TYPE.';
  allTypes: string[] = [
    'VIDEO.TYPE.PLAYLIST',
    'VIDEO.TYPE.VIDEO',
    'VIDEO.TYPE.STREAM'
  ];
  selectedTypes: string[] = [];
  initTypes: string[];
  queryParams$: Observable<boolean>;
  videos$: Observable<any>;

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

}
