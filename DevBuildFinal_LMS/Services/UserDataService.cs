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
    public class UserDataService : IUserDataService
    {
        private readonly string connString;

        public UserDataService(IConfiguration config)
        {
            connString = config.GetConnectionString("default");
        }

        public IEnumerable<User> GetUsers()
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "select * from user";

            IEnumerable<User> result = conn.Query<User>(command);

            conn.Close();

            return result;
        }

        public int AddUser(User user)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "insert into user (userTypeId, userName) ";
            command += "values (@userTypeId, @userName";

            int result = conn.Execute(command, user);

            conn.Close();

            return result;
        }

        public int ChangeAdminStatus(User user)
        {
            SqlConnection conn = new SqlConnection(connString);

            string command = "update user set userTypeId = @userTypeId where userId = @userId";

            int result = conn.Execute(command, new { userTypeId = user.userTypeId, userId = user.userId });

            conn.Close();

            return result;
        }

    }
}
