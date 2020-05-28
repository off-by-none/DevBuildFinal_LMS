using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevBuildFinal_LMS.Models
{
    public class Module
    {
        public int moduleId { get; set; }
        public string moduleName { get; set; }
        public int courseId { get; set; }
    }
}
