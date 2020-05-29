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

            string command = "select * from course where courseId = @val";

            Course result = conn.QueryFirstOrDefault<Course>(command, new { val = id });

            conn.Close();

            return result;
        }

        public IEnumerable<Course> GetCoursesByUserId(int userId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "SELECT DISTINCT c.* ";
            command += "FROM LMS.dbo.StudentCourse sc ";
            command += "LEFT JOIN LMS.dbo.Course c ON c.courseId = sc.courseId ";
            command += "WHERE studentId = @val ";

            IEnumerable<Course> result = conn.Query<Course>(command, new{ val = userId });

            conn.Close();

            return result;
        }

        public IEnumerable<Course> GetCoursesByTeacherId(int userId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "SELECT * ";
            command += "FROM LMS.dbo.Course ";
            command += "WHERE assignedTeacherId = @val ";

            IEnumerable<Course> result = conn.Query<Course>(command, new { val = userId });

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

        public IEnumerable<Module> GetModulesByCourseId(int courseId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from module where courseId = @val";

            IEnumerable<Module> result = conn.Query<Module>(command, new { val = courseId });

            conn.Close();

            return result;
        }

        public IEnumerable<Assignment> GetAssignments(int moduleId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from assignment where moduleId = @val";

            IEnumerable<Assignment> result = conn.Query<Assignment>(command, new { val = moduleId });

            conn.Close();

            return result;
        }

        public IEnumerable<Resource> GetResources(int moduleId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from resources where moduleId = @val";

            IEnumerable<Resource> result = conn.Query<Resource>(command, new { val = moduleId });

            conn.Close();

            return result;
        }

        public IEnumerable<User> GetStudentsByCourseId(int courseId)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "SELECT u.* FROM LMS.dbo.UserTable u ";
            command += "LEFT JOIN LMS.dbo.StudentCourse sc ON sc.studentId = u.userId ";
            command += "where sc.courseId = @val ";

            IEnumerable<User> result = conn.Query<User>(command, new { val = courseId });

            conn.Close();

            return result;
        }

        public int DeleteCourse(int id)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "Delete from course where courseId = @id";

            int result = conn.Execute(command, new { id = id });

            conn.Close();

            return result;
        }

        public int AddAssignment(Assignment assignment)
        {
            SqlConnection conn = new SqlConnection(connString);
            string command = "INSERT INTO Assignment (assignmentName, moduleId, assignmentURL) ";
            command += "values (@assignmentName, @moduleId, @assignmentURL)";
            int result = conn.Execute(command, assignment);
            conn.Close();
            return result;
        }

        public int AddResource(Resource resource)
        {
            SqlConnection conn = new SqlConnection(connString);
            string command = "INSERT INTO Resources (resourceName, moduleId, resourceURL) ";
            command += "VALUES (@resourceName, @moduleId, @resourceURL)";
            int result = conn.Execute(command, resource);
            conn.Close();
            return result;
        }

        public int Enroll(StudentCourse studentCourse)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into StudentCourse (studentId, courseId) ";
            command += "values (@studentId, @courseId)";

            int result = conn.Execute(command, studentCourse);

            conn.Close();

            return result;
        }
    }
}
