import { Component, Input } from '@angular/core';
import { Course } from '../interfaces/course';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.scss']
})
/** my-courses component*/
export class MyCoursesComponent {

  @Input() myCourses: Course[];
  hiddenCourseDetail: boolean[] = [];
  
  /** my-courses ctor */
  constructor() { }

  showCourse = function (course: Course) {
    this.hideCourseDetails = false;
    this.courseName = course.courseName;
  }

  flipHiddenCourseDetail(i: number) {
    for (let i = 0; i < this.hiddenCourseDetail.length; i++) {
      this.hiddenCourseDetail[i] = true;
    }
    this.hiddenCourseDetail[i] = !this.hiddenCourseDetail[i];
  }

}
