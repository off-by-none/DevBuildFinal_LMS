import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course, Module, NewCourse, Assignments, Resource, StudentCourse } from './interfaces/course';
import { User } from './interfaces/User';


@Injectable()
export class CourseDataService {

  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get<Course[]>('/api/course');
  }

  getMyCourses(userId: number) {
    return this.http.get<Course[]>(`/api/course/user/${userId}`);
  }

  getMyTeacherCourses(userId: number) {
    return this.http.get<Course[]>(`/api/course/teacher/${userId}`);
  }

  addCourse(newCourse: NewCourse) {
    return this.http.post<NewCourse>('/api/course/add/course', newCourse);
  }

  deleteCourse(id: number) {
    return this.http.delete(`/api/course/` + id);
  }

  getModules(courseId: number) {
    return this.http.get<Module[]>(`/api/course/modules/${courseId}`);
  }

  getCourseById(courseId: number) {
    return this.http.get<Course>(`/api/course/${courseId}`);
  }

  getAssignments(moduleId: number) {
    return this.http.get<Assignments[]>(`/api/course/module/assignments/${moduleId}`);
  }

  getResources(moduleId: number) {
    return this.http.get<Resource[]>(`/api/course/module/resources/${moduleId}`);
  }

  getStudentsByCourseId(courseId: number) {
    return this.http.get<User[]>(`/api/course/users/${courseId}`);
  }


  addTeacherToCourse(course: Course) {
    return this.http.post(`/api/course/add/teacher`, course);
  }

  addModule(newModule: Module) {
    return this.http.post<Module>(`/api/course/add/module`, newModule);
  }

  addAssignment(newAssignment: Assignments) {
    return this.http.post<Assignments>(`/api/course/module/add/assignment`, newAssignment);
  }

  addResource(newResource: Resource) {
    return this.http.post<Resource>(`/api/course/module/add/resource`, newResource);
  }

  enroll(newStudentCourse: StudentCourse) {
    return this.http.post<StudentCourse>('/api/course/enroll', newStudentCourse);
  }

  unenroll(newStudentCourse: StudentCourse) {
    return this.http.delete<StudentCourse>('/api/course/unenroll/' + newStudentCourse.studentId + '/' + newStudentCourse.courseId);
  }

}
