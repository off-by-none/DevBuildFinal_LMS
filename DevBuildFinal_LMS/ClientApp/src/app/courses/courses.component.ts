import { Component } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/User';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
/** courses component*/
export class CoursesComponent {

  allCourses: Course[];

    /** courses ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(
      (data: Course[]) => {
        this.allCourses = data;
      },
      error => console.error(error)
    );
  }
}
