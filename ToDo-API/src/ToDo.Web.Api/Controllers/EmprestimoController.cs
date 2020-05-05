using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Queries;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Web.Api.Configs;
using ToDo.Web.Api.Dtos;

namespace ToDo.Web.Api.Controllers
{
    [Route("emprestimo")]
    public class EmprestimoController : ApiBaseController
    {
        private readonly IEmprestimoService _service;
        private readonly IEmprestimoQuery _query;

        public EmprestimoController(IEmprestimoService service, IUnitOfWork unitOfWork, IEmprestimoQuery query) : base(unitOfWork)
        {
            _service = service;
            _query = query;
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] EmprestimoDto dto)
        {
            await _service.CriarAsync(dto.DataEmprestimo, dto.DataVencimento, dto.LivroId, dto.UsuarioId);
            await UnitOfWork.CommitAsyc();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            var emprestimos = await _query.ObterPorAsync(pagination);
            return Ok(emprestimos);
        }

        [HttpPut("{id:int}/devolver")]
        public async Task<IActionResult> DevolverAsync(int id)
        {
            await _service.DevolverAsync(id);
            await UnitOfWork.CommitAsyc();

            return Ok();
        }
    }
}