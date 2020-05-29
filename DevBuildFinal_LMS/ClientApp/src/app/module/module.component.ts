import { Component, Input } from '@angular/core';
import { Assignments, Resource } from '../interfaces/course';
import { User } from '../interfaces/User';
import { CourseDataService } from '../course-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
/** module component*/
export class ModuleComponent {

  @Input() user: User;
  id: number;
  userTypeId: number;
  assignments: Assignments[];
  resources: Resource[];
  assignmentName: string;
  assignmentURL: string;
  resourceName: string;
  resourceURL: string;
  is_HiddenAddAssignment: boolean = true;
  is_HiddenAddResource: boolean = true;

  /** module ctor */
  constructor(private courseData: CourseDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAssignments();
    this.getResources();
  }

  getAssignments() {
    this.route.params.subscribe(params => {
      this.id = +params['moduleId'];
      this.userTypeId = +params['userTypeId'];

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

  addAssignment() {
    let newAssignment: Assignments = {
      assignmentId: 0,
      assignmentName: this.assignmentName,
      assignmentURL: this.assignmentURL,
      moduleId: +this.id
    }
    this.courseData.addAssignment(newAssignment).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => console.error(error)
    );
    this.flipHiddenAddAssignment();
    this.getAssignments();
  }

  addResource() {
    let newResource: Resource = {
      resourceId: 0,
      resourceName: this.resourceName,
      resourceURL: this.resourceURL,
      moduleId: +this.id
    }
    this.courseData.addResource(newResource).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => console.error(error)
    );
    this.flipHiddenAddResource();
    this.getResources()
  }

  flipHiddenAddAssignment() {
    this.is_HiddenAddAssignment = !this.is_HiddenAddAssignment;
  }

  flipHiddenAddResource() {
    this.is_HiddenAddResource = !this.is_HiddenAddResource;
  }

}
