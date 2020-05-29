import { Component, Input } from '@angular/core';
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

  @Input() user: User;

  courseName: string;
  userName: string;
  userTypeId: number;
  message: string;

  selectedTeacherId: number;
  selectedCourseId: number;

  newAdminId: number;

  regularUsers: User[];
  teachers: User[];
  allCourses: Course[];

  hiddenCourses: boolean = true;
  hiddenNewCourse: boolean = true;
  hiddenNewUser: boolean = true;
  hiddenTeacherCourse: boolean = true;
  hiddenAdminGrant: boolean = true;

  /** admin ctor */
  constructor(private courseData: CourseDataService, private userData: UserDataService) { }

  ngOnInit() {
    this.getTeachers();
    this.getAllCourses();
    this.getRegularUsers();
  }

  getTeachers() {
    this.userData.getTeachers().subscribe(
      (data: User[]) => {
        this.teachers = data;
      },
      error => console.error(error)
    );
  }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(
      (data: Course[]) => {
        this.allCourses = data;
      },
      error => console.error(error)
    );
  }

  getRegularUsers() {
    this.userData.getRegularUsers().subscribe(
      (data: User[]) => {
        this.regularUsers = data;
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

  addTeacherToCourse() {
    let newTeacherCourse: Course = {
      assignedTeacherId: +this.selectedTeacherId, //IMPORTANT we must cast this as an INT or the Json will not convert correctly
      courseName: '',
      courseId: +this.selectedCourseId //IMPORTANT we must cast this as an INT or the Json will not convert correctly
    }

    this.courseData.addTeacherToCourse(newTeacherCourse).subscribe(
      (data: any) => {
        console.log(data);
      },
      error => console.error(error)
    );

    this.resetHidden();
  }

  giveUserAdminRights() {

    console.log(this.newAdminId);

    let newAdmin: User = {
      userId: +this.newAdminId,
      userName: ' ',
      userTypeId: 1
    }

    this.userData.changeAdminStatus(newAdmin).subscribe(
      (data: any) => {
        console.log(data);
        this.getRegularUsers();
        this.resetHidden();
      },
      error => console.error(error)
    );
  }

  flipHiddenCourses() {
    this.resetHidden();
    this.hiddenCourses = !this.hiddenCourses;
  }

  flipHiddenNewCourse() {
    this.resetHidden();
    this.hiddenNewCourse = !this.hiddenNewCourse;
  }

  flipHiddenNewUser() {
    this.resetHidden();
    this.hiddenNewUser = !this.hiddenNewUser;
  }

  flipHiddenTeacherCourse() {
    this.resetHidden();
    this.hiddenTeacherCourse = !this.hiddenTeacherCourse;
  }

  flipHiddenAdminGrant() {
    this.resetHidden();
    this.hiddenAdminGrant = !this.hiddenAdminGrant;
  }

  resetHidden() {
    this.hiddenCourses = true;
    this.hiddenNewCourse = true;
    this.hiddenNewUser = true;
    this.hiddenTeacherCourse = true;
    this.hiddenAdminGrant = true;
  }

}
