export interface Course {
  courseId: number;
  courseName: string;
  assignments: Assignments[];

}
export interface Assignments {
  assignmentId: number;
  assignmentName: string;
}

export interface NewCourse {
  courseName: string;
}
