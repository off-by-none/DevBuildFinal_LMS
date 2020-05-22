using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        
    }
}