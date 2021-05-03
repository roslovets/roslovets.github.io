import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit, OnDestroy {

  @Input() allTypes: string[];
  @Input() initTypes: string[];
  @Input() showPlural: boolean = true;
  @Output() selectedTypesChange = new EventEmitter<string[]>();
  selectedTypes: string[] = [];
  contentChboxesSub: Subscription;
  contentChboxes: FormArray;

  constructor() { }

  ngOnInit(): void {
    this.contentChboxes = new FormArray(
      this.allTypes.map((c, i) => new FormControl())
    );
    this.contentChboxesSub = this.contentChboxes.valueChanges.pipe(
      map(vals => {
        return this.allTypes.filter((cat: string, i: number): boolean => vals[i]);
      })
    ).subscribe((selectedTypes: string[]) => {
      this.selectedTypes = selectedTypes;
      this.selectedTypesChange.emit(selectedTypes);
    });
    let selectedTypesValues: boolean[] = this.allTypes.map(Boolean);
    if (this.initTypes && this.initTypes.length > 0) {
      let initTypes: string[] = this.initTypes.map(t => t.toLowerCase());
      selectedTypesValues = this.allTypes.map((t: string) => initTypes.includes(t.toLowerCase()));
    }
    this.contentChboxes.setValue(selectedTypesValues);
  }

  getType(num: number): string {
    let type = this.allTypes[num];
    if (this.showPlural) {
      type = type + "S";
    };
    return type;
  }

  ngOnDestroy() {
    this.contentChboxesSub.unsubscribe();
  }

}
