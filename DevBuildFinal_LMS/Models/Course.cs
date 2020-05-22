using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevBuildFinal_LMS.Models
{
    public class Course
    {
        public int courseId { get; set; }
        public string courseName { get; set; }
        public int assignedTeacherId { get; set; }
    }
}
