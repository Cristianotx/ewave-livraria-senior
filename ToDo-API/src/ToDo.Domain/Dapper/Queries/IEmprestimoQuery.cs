using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IEmprestimoQuery
    {
        Task<IEnumerable<EmprestimoModel>> ObterPorAsync(Pagination pagination);
    }
}