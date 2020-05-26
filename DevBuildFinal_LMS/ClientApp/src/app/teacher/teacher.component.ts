import { Component } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { NewCourse } from '../interfaces/course';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.scss']
})
/** teacher component*/
export class TeacherComponent {
/** teacher ctor */
  courseName: string;

  constructor(private courseData: CourseDataService) { }

  submitCourse() {
    if (this.courseName == '') {
      return;
    }

    let newCourse: NewCourse = {
      courseName: this.courseName
    }
    this.courseData.addCourse(newCourse).subscribe();
  
  }

}
