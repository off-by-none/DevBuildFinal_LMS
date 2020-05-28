export interface Course {
  courseId: number;
  courseName: string;
  assignments: Assignments[];

}

export interface Module {
  moduleId: number;
  moduleName: string;
  courseId: number;
}

export interface Assignments {
  assignmentId: number;
  assignmentName: string;
  moduleId: number;
  assignmentURL: string;
}

export interface Resource {
  resourceId: number;
  resourceName: string;
  moduleId: number;
  resourceURL: string;
}

export interface NewCourse {
  courseName: string;
}
