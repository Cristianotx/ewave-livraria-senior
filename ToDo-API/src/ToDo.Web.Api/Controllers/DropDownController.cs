using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDo.Domain.Dapper.Queries;
using ToDo.Web.Api.Filters;

namespace ToDo.Web.Api.Controllers
{
    [ExceptionActionFilter]
    [Route("dropdown")]
    public class DropDownController : ControllerBase
    {
        private readonly IDropDownQuery _downQuery;

        public DropDownController(IDropDownQuery downQuery)
        {
            _downQuery = downQuery;
        }

        [HttpGet("estados-brasileiro")]
        public async Task<IActionResult> ObterEstadosBrasileirosAsync()
        {
            var result = await _downQuery.ObterEstadosBrasileirosAsync();
            return Ok(result);
        }

        [HttpGet("estados-brasileiro/{estadoId:int}/cidades")]
        public async Task<IActionResult> ObterEstadosBrasileirosAsync(int estadoId)
        {
            var result = await _downQuery.ObterCidadesPorEstadoIdAsync(estadoId);
            return Ok(result);
        }
    }
}