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

  hiddenCourseDetail: boolean[] = [];


  /** courses ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(
      (data: Course[]) => {
        for (let i = 0; i < data.length; i++) {
          this.hiddenCourseDetail.push(true);
        }
        this.allCourses = data;
      },
      error => console.error(error)
    );
  }

  deleteCourse(id: number) {
    this.courseData.deleteCourse(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getAllCourses();
      },
      error => console.error(error)
    );
  }

  flipHiddenCourseDetail(i: number) {
    for (let i = 0; i < this.hiddenCourseDetail.length; i++) {
      this.hiddenCourseDetail[i] = true;
    }
    this.hiddenCourseDetail[i] = !this.hiddenCourseDetail[i];
  }
}
