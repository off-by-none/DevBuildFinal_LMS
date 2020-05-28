import { Component, Input } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
/** my-courses component*/
export class MyCoursesComponent {
  @Input() user: User;

  myCourses: Course[];
  hiddenCourseDetail: boolean[] = [];

  /** my-courses ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    console.log(this.user.userId);
    if (this.user.userTypeId == 3) {
      this.getMyCourses();
    } else if (this.user.userTypeId == 2) {
      this.getMyTeacherCourses();
    } else {
      console.log("Error");
    }
  }

  //showCourse = function (course: Course) {
  //  this.hideCourseDetails = false;
  //  this.courseName = course.courseName;
  //}

  getMyCourses() {
    console.log(this.user.userId)
    this.courseData.getMyCourses(this.user.userId).subscribe(
      (data: Course[]) => {
        for (let i = 0; i < data.length; i++) {
          this.hiddenCourseDetail.push(true);
        }
        this.myCourses = data;
      },
      error => console.error(error)
    );
  }

  getMyTeacherCourses() {
    console.log(this.user.userId)
    this.courseData.getMyTeacherCourses(this.user.userId).subscribe(
      (data: Course[]) => {
        for (let i = 0; i < data.length; i++) {
          this.hiddenCourseDetail.push(true);
        }
        this.myCourses = data;
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
