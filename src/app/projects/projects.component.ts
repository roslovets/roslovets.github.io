import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  typePrefix: string = 'PROJECT.TYPE.';
  allTypes: string[] = [
    'PROJECT.TYPE.MATLAB',
    'PROJECT.TYPE.SIMULINK',
    'PROJECT.TYPE.WEB'
  ];
  selectedTypes: string[] = [];
  initTypes: string[];
  queryParams$: Observable<boolean>;
  projects$: Observable<any>;

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
    this.projects$ = this.dataService.getProjects();
  }

  filterByType(projects: any[]): any[] {
    return projects.filter(project => this.selectedTypes.includes(project.type));
  }

  isSelected() {
    return this.selectedTypes.length > 0;
  }

}
