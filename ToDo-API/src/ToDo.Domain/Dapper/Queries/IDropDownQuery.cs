using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IDropDownQuery
    {
        Task<IEnumerable<DropDown>> ObterEstadosBrasileirosAsync();
        Task<IEnumerable<DropDown>> ObterCidadesPorEstadoIdAsync(int estadoId);
    }
}