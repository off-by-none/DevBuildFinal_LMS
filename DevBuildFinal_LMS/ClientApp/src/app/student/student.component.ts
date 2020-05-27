import { Component, OnInit, Input } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/User';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
/** student component*/
export class StudentComponent {

  @Input() user: User;
  allCourses: Course[];
  myCourses: Course[];

  /** student ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getAllCourses();
    this.getMyCourses();
  }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(
      (data: Course[]) => {
        this.allCourses = data;
      },
      error => console.error(error)
    );
  }

  getMyCourses() {
    console.log(this.user.userId)
    this.courseData.getMyCourses(this.user.userId).subscribe(
      (data: Course[]) => {
        this.myCourses = data;
      },
      error => console.error(error)
    );
  }

}
