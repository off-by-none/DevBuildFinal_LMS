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

            Course result = conn.QueryFirstOrDefault<Course>(command);

            conn.Close();

            return result;
        }

        public int AddCourse(Course course)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into course (courseName, assignedTeacherId) ";
            command += "values (@courseName, @assignedTeacherId)";

            int result = conn.Execute(command, course);

            conn.Close();

            return result;
        }


    }
}
