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

  myTeacherCourses: Course[];

  /** teacher ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getMyTeacherCourses();
  }

  getMyTeacherCourses() {
    console.log(this.user.userId)
    this.courseData.getMyTeacherCourses(this.user.userId).subscribe(
      (data: Course[]) => {
        this.myTeacherCourses = data;
      },
      error => console.error(error)
    );
  }

}
