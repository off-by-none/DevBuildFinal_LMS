import { Component, Input } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course, Module, StudentCourse } from '../interfaces/course';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
/** courses component*/
export class CoursesComponent {

  @Input() user: User;

  allCourses: Course[];
  hiddenCourseDetail: boolean[] = [];
  modules: Module[];
  enrollMessage: string;
  //teacher: User;

  /** courses ctor */
  constructor(private courseData: CourseDataService) { }

  ngOnInit() {
    this.getAllCourses();
    this.enrollMessage = "";
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

  getModules(courseId: number) {
    this.courseData.getModules(courseId).subscribe(
      (data: Module[]) => {
        this.modules = data;
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

  flipHiddenCourseDetail(i: number, courseId: number) {
    for (let i = 0; i < this.hiddenCourseDetail.length; i++) {
      this.hiddenCourseDetail[i] = true;
    }
    this.hiddenCourseDetail[i] = !this.hiddenCourseDetail[i];
    this.enrollMessage = "";
    this.getModules(courseId);
    //this.getTeacher(courseId);
  }

  enroll(i: number, courseId: number, courseName: string) {
    let newStudentCourse: StudentCourse = {
      studentId: this.user.userId,
      courseId: courseId
    }
    console.log(newStudentCourse);
    this.courseData.enroll(newStudentCourse).subscribe(
      (data: any) => {
        console.log(data);
        this.getAllCourses();
        this.enrollMessage = "You enrolled in " + courseName + "!";
        this.hiddenCourseDetail[i] = !this.hiddenCourseDetail[i];
      },
      error => console.error(error)
    );
  }

  getTeacher(courseId: number) {
    this.courseData.getMyTeacher(courseId).subscribe(
      (data: any) => {
        //this.teacher = data;
      },
      error => console.error(error)
    );
  }
}
