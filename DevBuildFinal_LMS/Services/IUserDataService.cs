using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevBuildFinal_LMS.Models;

namespace DevBuildFinal_LMS.Services
{
    public interface IUserDataService
    {
        public IEnumerable<User> GetUsers();
        public IEnumerable<string> GetUsersNames();
        public User GetUserByName(string userName);
        public int AddUser(User user);
        public int ChangeAdminStatus(User user);
        public IEnumerable<User> GetTeachers();
        public IEnumerable<User> GetRegularUsers();
    }
}