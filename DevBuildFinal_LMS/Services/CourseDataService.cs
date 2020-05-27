using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using DevBuildFinal_LMS.Models;
using System.Data.SqlClient;

namespace DevBuildFinal_LMS.Services
{
    public class CourseDataService : ICourseDataService
    {
        private readonly string connString;

        public CourseDataService(IConfiguration config)
        {
            connString = config.GetConnectionString("default");
        }

        public IEnumerable<Course> GetCourses()
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from course";

            IEnumerable<Course> result = conn.Query<Course>(command);

            conn.Close();

            return result;
        }

        public Course GetCourseById(int id)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from course where courseId = @id";

            Course result = conn.QueryFirstOrDefault<Course>(command, new { id = id });

            conn.Close();

            return result;
        }

        public IEnumerable<Course> GetCoursesByUserId(int userId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "SELECT c.* ";
            command += "FROM LMS.dbo.StudentCourse sc ";
            command += "LEFT JOIN LMS.dbo.Course c ON c.courseId = sc.courseId ";
            command += "WHERE studentId = @val ";

            IEnumerable<Course> result = conn.Query<Course>(command, new{ val = userId });

            conn.Close();

            return result;
        }

        public int ChangeEnrollmentStatus(StudentCourse studentCourse) //maybe change this name to add student to class?
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into studentcourse (courseId, studentId) ";
            command += "values (@courseId, @studentId ";

            int result = conn.Execute(command, new { courseId = studentCourse.courseId, studentId = studentCourse.studentId });

            conn.Close();

            return result;
        }

        public int AddCourse(Course course)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into course (courseName) ";
            command += "values (@courseName)";

            int result = conn.Execute(command, course);

            conn.Close();

            return result;
        }

        public int AddTeacherToCourse(Course course)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "update course set assignedTeacherId = @assignedTeacherId where courseId = @courseId";

            int result = conn.Execute(command, new { assignedTeacherId = course.assignedTeacherId, courseId = course.courseId });

            conn.Close();

            return result;
        }

        public int AddModule(Module module)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into module (moduleName, courseId) ";
            command += "values (@moduleName, @courseId)";

            int result = conn.Execute(command, module);

            conn.Close();

            return result;
        }

        public IEnumerable<Module> ViewModulesById(int id)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from module where id = id";

            IEnumerable<Module> result = conn.Query<Module>(command);

            conn.Close();

            return result;
        }
    }
}
