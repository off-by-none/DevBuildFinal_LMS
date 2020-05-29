using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevBuildFinal_LMS.Models
{
    public class Resource
    {
        public int resourceId { get; set; }
        public string resourceName { get; set; }
        public string resourceURL { get; set; }
        public int moduleId { get; set; }
    }
}
