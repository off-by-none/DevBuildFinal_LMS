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

  myCourses: Course[];

  /** student ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getMyCourses();
  }

  getMyCourses() {
    console.log(this.user.userId)
    this.courseData.getMyCourses(this.user.userId).subscribe(
      (data: Course[]) => {
        this.myCourses = data;
        console.log(this.myCourses)
      },
      error => console.error(error)
    );
  }

}
