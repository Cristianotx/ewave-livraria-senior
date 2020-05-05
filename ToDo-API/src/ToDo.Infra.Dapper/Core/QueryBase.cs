using System;
using System.Data;
using System.Data.SqlClient;

namespace ToDo.Infra.Dapper.Core
{
    public class QueryBase
    {
        protected readonly string ConnectionString;

        public QueryBase(string connectionString)
        {
            ConnectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        protected virtual IDbConnection CreateConnection() => new SqlConnection(ConnectionString);
    }
}