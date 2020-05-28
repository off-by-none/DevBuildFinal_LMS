import { Component, Output, EventEmitter } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course, Module } from '../interfaces/course'
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.scss']
})
/** course-detail component*/
export class CourseDetailComponent {

  @Output() deleteEmitter = new EventEmitter<number>();
  id: number;
  course: Course;
  modules: Module[];
  students: User[];

  /** course-detail ctor */
  constructor(private courseData: CourseDataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getModules();
    this.getCourseById();
    this.getStudentsByCourseId();
  }

  add(courseId: number) {
    //this.courseData.postCourse(courseId).subscribe(
      //(data: any) => console.log('success! ' + courseId),
      //error => console.error(error)
    //)
  }

  delete(courseId: number) {
    //this.deleteEmitter.emit(courseId);
  }

  getModules() {
    this.route.params.subscribe(params => {
      this.id = +params['courseId'];

      this.courseData.getModules(this.id).subscribe(
        (data: Module[]) => { this.modules = data },
        error => console.error(error)
      );
    })
  }

  getCourseById() {
    this.route.params.subscribe(params => {
      this.id = +params['courseId'];

      this.courseData.getCourseById(this.id).subscribe(
        (data: Course) => { this.course = data },
        error => console.error(error)
      );
    })
  }

  getStudentsByCourseId() {
    this.route.params.subscribe(params => {
      this.id = +params['courseId'];

      this.courseData.getStudentsByCourseId(this.id).subscribe(
        (data: User[]) => { this.students = data },
        error => console.error(error)
      );
    })
  }

}
