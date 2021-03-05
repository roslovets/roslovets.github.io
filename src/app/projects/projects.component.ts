import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  contentChboxes: FormArray;
  contentCatsValues: boolean[] = [true, true, true];
  contentCats: string[] = [
    'MATLAB',
    'Simulink',
    'WEB'
  ];

  projects$: Observable<any>;

  ngOnInit() {
    this.projects$ = this.dataService.getProjects();
    this.contentChboxes = new FormArray(
      this.contentCats.map((c, i) => new FormControl(this.contentCatsValues[i]))
    );
    this.contentChboxes.valueChanges.subscribe(vals => this.contentCatsValues = vals);
  }

  btnLinkClick(url: string) {
    window.open(url);
  }

  checkShow(type: string) {
    return this.contentCatsValues[this.contentCats.indexOf(type)];
  }

  getOpenBtnName(project: any) {
    if (project.url === 'https://exponenta.ru/contacts')
      return 'PROJECT.GETINFO'
    else
      return 'PROJECT.OPEN'
  }

  isContent() {
    return this.contentCatsValues.some(Boolean);
  }

}
