import { Component, Input } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
/** teacher component*/
export class TeacherComponent {

  @Input() user: User;

  /** teacher ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
  }
}
