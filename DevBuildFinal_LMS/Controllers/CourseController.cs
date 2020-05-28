using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevBuildFinal_LMS.Models;
using DevBuildFinal_LMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DevBuildFinal_LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseDataService courseData;
    
        public CourseController(ICourseDataService courseData)
        {
            this.courseData = courseData;
        }

        [HttpGet]
        public IEnumerable<Course> GetCourses()
        {
            return courseData.GetCourses();
        }

        [HttpGet("{id}")]
        public Course GetCourseById(int id)
        {
            return courseData.GetCourseById(id);
        }

        [HttpGet("user/{userId}")]
        public IEnumerable<Course> GetCoursesByUserId(int userId)
        {
            return courseData.GetCoursesByUserId(userId);
        }

        [HttpPut("enrollmentstatus")]
        public Object ChangeEnrollmentStatus(StudentCourse studentCourse)
        {
            var result = courseData.ChangeEnrollmentStatus(studentCourse);

            return UpdateError(result);
        }

        [HttpPost("add/course")]
        public Object AddCourse(Course course)
        {
            var result = courseData.AddCourse(course);

            return UpdateError(result);
        }

        [HttpPost("add/teacher")]
        public Object AddTeacherToCourse(Course course)
        {
            var result = courseData.AddTeacherToCourse(course);

            return UpdateError(result);
        }

        [HttpPost("add/module")]
        public Object AddModule(Module module)
        {
            var result = courseData.AddModule(module);

            return UpdateError(result);
        }
        [HttpGet("module/{id}")]
        public IEnumerable<Module> ViewModulesById(int id)
        {
            return courseData.ViewModulesById(id);
        }

        [HttpDelete("{id}")]
        public Object DeleteCourse(int id)
        {
            var result = courseData.DeleteCourse(id);

            return UpdateError(result);
        }

        public object UpdateError(int result)
        {
            if (result == 1)
            {
                return new { Success = true, Message = "Success" };
            }
            else
            {
                return new { Success = false, Message = "Error" };
            }
        }


    }
}