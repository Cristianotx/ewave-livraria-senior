using Dapper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Domain.Dapper.Queries;
using ToDo.Infra.Core;
using ToDo.Infra.Dapper.Core;
using ToDo.Infra.Dapper.Scripts;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class EmprestimoQuery : QueryBase, IEmprestimoQuery
    {
        public EmprestimoQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        public async Task<IEnumerable<EmprestimoModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<EmprestimoModel>(EmprestimoScript.Paginada, parameters);
            }
        }
    }


}