import { Component } from '@angular/core';
import { Course, NewCourse } from '../interfaces/course';
import { CourseDataService } from '../course-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {

  courseName: string;
  message: string;
  allCourses: Course[];

  /** admin ctor */
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

  submitCourse() {
    if (this.courseName == '') {
      this.message = "Error, you must input a title";
      return;
    } else {
      let newCourse: NewCourse = {
        courseName: this.courseName
      }
      this.courseData.addCourse(newCourse).subscribe();
      this.message = "Course added!";
      window.location.reload();
    }
  }

}
