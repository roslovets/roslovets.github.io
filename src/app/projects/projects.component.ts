import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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

  contentChboxes: FormArray;
  allTypes: string[] = [
    'MATLAB',
    'Simulink',
    'WEB'
  ];
  selectedTypes: string[];

  projects$: Observable<any>;
  queryParams$: Observable<boolean>;
  contentChboxesSub: Subscription;

  ngOnInit() {
    this.contentChboxes = new FormArray(
      this.allTypes.map((c, i) => new FormControl())
    );
    this.contentChboxesSub = this.contentChboxes.valueChanges.pipe(
      map(vals => {
        return this.allTypes.filter((cat: string, i: number): boolean => vals[i]);
      })
    ).subscribe(selectedTypes => this.selectedTypes = selectedTypes);
    this.queryParams$ = this.route.queryParams.pipe(
      map(params => {
        let contentTypesValues = this.allTypes.map(Boolean);
        let type = params['type'];
        if (type) {
          type = type.toLocaleLowerCase();
          contentTypesValues = this.allTypes.map(t => t.toLocaleLowerCase() === type);
        }
        this.contentChboxes.setValue(contentTypesValues);
        return true;
      }),
    );
    this.projects$ = this.dataService.getProjects();
  }

  getType(num: number): string {
    return "PROJECT.TYPE." + this.allTypes[num].toUpperCase();
  }

  btnLinkClick(url: string) {
    window.open(url);
  }

  filterByType(projects: any[]) {
    return projects.filter(project => this.selectedTypes.includes(project.type));
  }

  getOpenBtnName(project: any) {
    if (project.url === 'https://exponenta.ru/contacts')
      return 'PROJECT.GETINFO'
    else
      return 'PROJECT.OPEN'
  }

  isSelected() {
    return this.selectedTypes.length > 0;
  }

  ngOnDestroy() {
    this.contentChboxesSub.unsubscribe();
  }

}
