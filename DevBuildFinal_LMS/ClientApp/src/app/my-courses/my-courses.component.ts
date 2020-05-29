import { Component, Input } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course, Module } from '../interfaces/course';
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
  modules: Module[];
  hiddenCourseDetail: boolean[] = [];
  isHidden_moduleNameInput: boolean = true;
  newModuleName: string = "";
  selectedCourse: Course;

  /** my-courses ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
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

  getModules(courseId: number) {
    this.courseData.getModules(courseId).subscribe(
      (data: Module[]) => {
        this.modules = data;
      },
      error => console.error(error)
    );
  }

  addModule(selectedCourseId: number) {
    this.flipHiddenModuleName(null);
    let newModule: Module = {
      moduleId: 0,
      moduleName: this.newModuleName,
      courseId: selectedCourseId
    }
    this.courseData.addModule(newModule).subscribe();
    this.getModules(selectedCourseId);
  }

  flipHiddenModuleName(course: Course) {
    this.selectedCourse = course;
    this.isHidden_moduleNameInput = !this.isHidden_moduleNameInput;
  }

  flipHiddenCourseDetail(i: number, courseId: number) {
    for (let i = 0; i < this.hiddenCourseDetail.length; i++) {
      this.hiddenCourseDetail[i] = true;
    }
    this.hiddenCourseDetail[i] = !this.hiddenCourseDetail[i];
    this.getModules(courseId);
  }

}
