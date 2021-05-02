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
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  allTypes: string[] = [
    'MATLAB',
    'Simulink',
    'WEB'
  ];
  selectedTypes: string[] = [];
  initTypes: string[];

  projects$: Observable<any>;
  queryParams$: Observable<boolean>;

  ngOnInit() {
    this.queryParams$ = this.route.queryParams.pipe(
      map((params: any): boolean => {
        let type = params['type'];
        if (type) {
          this.initTypes = this.allTypes.filter(t => t.toLocaleLowerCase() === type.toLocaleLowerCase());
        }
        return true;
      }),
    );
    this.projects$ = this.dataService.getProjects();
  }

  btnLinkClick(url: string) {
    window.open(url);
  }

  filterByType(projects: any[]): any[] {
    return projects.filter(project => this.selectedTypes.includes(project.type));
  }

  isSelected() {
    return this.selectedTypes.length > 0;
  }

  getOpenBtnName(project: any) {
    if (project.url === 'https://exponenta.ru/contacts')
      return 'PROJECT.GETINFO'
    else
      return 'PROJECT.OPEN'
  }

}
