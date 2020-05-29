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

        [HttpGet("teacher/{userId}")]
        public IEnumerable<Course> GetCoursesByTeacherId(int userId)
        {
            return courseData.GetCoursesByTeacherId(userId);
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

        [HttpPost("add/module")]
        public Object AddModule(Module module)
        {
            var result = courseData.AddModule(module);

            return UpdateError(result);
        }

        [HttpPost("add/teacher")]
        public Object AddTeacherToCourse(Course course)
        {
            var result = courseData.AddTeacherToCourse(course);

            return UpdateError(result);
        }

        [HttpGet("module/{id}")]
        public IEnumerable<Module> ViewModulesById(int id)
        {
            return courseData.ViewModulesById(id);
        }

        [HttpGet("modules/{courseId}")]
        public IEnumerable<Module> GetModulesByCourseId(int courseId)
        {
            return courseData.GetModulesByCourseId(courseId);
        }

        [HttpGet("module/assignments/{moduleId}")]
        public IEnumerable<Assignment> GetAssignments(int moduleId)
        {
            return courseData.GetAssignments(moduleId);
        }

        [HttpGet("module/resources/{moduleId}")]
        public IEnumerable<Resource> GetResources(int moduleId)
        {
            return courseData.GetResources(moduleId);
        }

        [HttpGet("users/{courseId}")]
        public IEnumerable<User> GetStudentsByCourseId(int courseId)
        {
            return courseData.GetStudentsByCourseId(courseId);
        }

        [HttpDelete("{id}")]
        public Object DeleteCourse(int id)
        {
            var result = courseData.DeleteCourse(id);

            return UpdateError(result);
        }

        [HttpPost("module/add/assignment")]
        public Object AddAssignment(Assignment assignment)
        {
            var result = courseData.AddAssignment(assignment);

            return UpdateError(result);
        }

        [HttpPost("module/add/resource")]
        public Object AddResource(Resource resource)
        {
            var result = courseData.AddResource(resource);

            return UpdateError(result);
        }

        [HttpPost("enroll")]
        public Object Enroll(StudentCourse studentCourse)
        {
            var result = courseData.Enroll(studentCourse);

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