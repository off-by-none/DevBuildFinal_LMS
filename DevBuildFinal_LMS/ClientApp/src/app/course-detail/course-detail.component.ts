import { Component, Output, EventEmitter } from '@angular/core';
import { CourseDataService } from '../course-data.service';
import { Course } from '../interfaces/course'

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.scss']
})
/** course-detail component*/
export class CourseDetailComponent {

  @Output() deleteEmitter = new EventEmitter<number>();

  /** course-detail ctor */
  constructor(private courseData: CourseDataService) {}

  add(courseId: number) {
    //this.courseData.postCourse(courseId).subscribe(
      //(data: any) => console.log('success! ' + courseId),
      //error => console.error(error)
    //)
  }

  delete(courseId: number) {
    //this.deleteEmitter.emit(courseId);
  }

}
