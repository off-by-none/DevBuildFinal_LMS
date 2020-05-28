import { Component } from '@angular/core';
import { Assignments, Resource } from '../interfaces/course'
import { CourseDataService } from '../course-data.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.scss']
})
/** module component*/
export class ModuleComponent {

  id: number;
  assignments: Assignments[];
  resources: Resource[];

  /** module ctor */
  constructor(private courseData: CourseDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAssignments();
    this.getResources();
  }

  getAssignments() {
    this.route.params.subscribe(params => {
      this.id = +params['moduleId'];

      this.courseData.getAssignments(this.id).subscribe(
        (data: Assignments[]) => { this.assignments = data },
        error => console.error(error)
      );
    })
  }

  getResources() {
    this.route.params.subscribe(params => {
      this.id = +params['moduleId'];

      this.courseData.getResources(this.id).subscribe(
        (data: Resource[]) => { this.resources = data },
        error => console.error(error)
      );
    })
  }

}
