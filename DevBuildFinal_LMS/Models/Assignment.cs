using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevBuildFinal_LMS.Models
{
    public class Assignment
    {
        public int assignmentId { get; set; }
        public string assignmentName { get; set; }
        public string assignmentURL { get; set; }
        public int moduleId { get; set; }
    }
}
