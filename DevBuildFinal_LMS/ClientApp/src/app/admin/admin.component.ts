import { Component } from '@angular/core';
import { Course, NewCourse } from '../interfaces/course';
import { CourseDataService } from '../course-data.service';
import { UserDataService } from '../user-data';
import { User, NewUser } from '../interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {

  courseName: string;
  userName: string;
  userTypeId: number;
  message: string;
  allCourses: Course[];
  hiddenCourses: boolean = true;
  hiddenNewCourse: boolean = true;
  hiddenNewUser: boolean = true;

  /** admin ctor */
  constructor(private courseData: CourseDataService, private userData: UserDataService) { }

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
      this.message = "Error, you must input a course title";
      return;
    } else {
      let newCourse: NewCourse = {
        courseName: this.courseName
      }
      this.courseData.addCourse(newCourse).subscribe();
      this.message = "Course added!";

      this.resetHidden();
    }
  }

  addUser() {
    if (this.userName == '') {
      this.message = "Error, you must input a Name";
      return;
    } else {
      let newUser: NewUser = {
        userTypeId: +this.userTypeId, //IMPORTANT we must cast this as an INT or the Json will not convert correctly
        userName: this.userName
      }
      this.userData.addUser(newUser).subscribe();
      this.message = "User added!";

      this.resetHidden();
    }
  }

  flipHiddenCourses() {
    this.hiddenCourses = !this.hiddenCourses;
  }

  flipHiddenNewCourse() {
    this.hiddenNewCourse = !this.hiddenNewCourse;
  }

  flipHiddenNewUser() {
    this.hiddenNewUser = !this.hiddenNewUser;
  }

  resetHidden() {
    this.hiddenCourses = true;
    this.hiddenNewCourse = true;
    this.hiddenNewUser = true;
  }

}
