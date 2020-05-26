import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
/** student component*/
export class StudentComponent {
    courses: Course[];
    /** student ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getCourse();
  }

      getCourse() {
        this.courseData.getAllCourses().subscribe(
          (data: Course[]) => {
            this.courses = data;
          },
          error => console.error(error)
        );
  }

  

  //getClassesByID(id) {
  //  this.courseData.getCoursesById().
  //}
    
}
