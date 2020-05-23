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

        [HttpPut("enrollmentstatus")]
        public object ChangeEnrollmentStatus(StudentCourse studentCourse)
        {
            var result = courseData.ChangeEnrollmentStatus(studentCourse);

            return UpdateError(result);
        }

        [HttpPost("add/course")]
        public object AddCourse(Course course)
        {
            var result = courseData.AddCourse(course);

            return UpdateError(result);
        }

        [HttpPost("add/teacher")]
        public object AddTeacherToCourse(Course course)
        {
            var result = courseData.AddTeacherToCourse(course);

            return UpdateError(result);
        }

        [HttpPost("add/module")]
        public object AddModule(Module module)
        {
            var result = courseData.AddModule(module);

            return UpdateError(result);
        }
        [HttpGet("module/{id}")]
        public IEnumerable<Module> ViewModulesById(int id)
        {
            return courseData.ViewModulesById(id);
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