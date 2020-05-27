import { Component } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../interfaces/course';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
/** teacher component*/
export class TeacherComponent {
/** teacher ctor */

  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
  }

}
