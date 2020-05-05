using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Queries;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;
using ToDo.Web.Api.Configs;
using ToDo.Web.Api.Dtos;

namespace ToDo.Web.Api.Controllers
{
    [Route("autor")]
    public class AutorController : ApiBaseController
    {
        private readonly IAutorService _service;
        private readonly IAutorQuery _query;

        public AutorController(IAutorService service, IUnitOfWork unitOfWork, IAutorQuery query) : base(unitOfWork)
        {
            _service = service;
            _query = query;
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] AutorDto dto)
        {
            var aggregateId = Guid.NewGuid();
            await _service.CriarAsync(aggregateId, dto.Nome);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            var autores = await _query.ObterPorAsync(pagination);
            return Ok(autores);
        }

        [HttpGet("ativos")]
        public async Task<IActionResult> ObterAtivosAsync()
        {
            var autores = await _query.ObterAtivosAsync();
            return Ok(autores);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var autor = await _query.ObterPorAsync(id);
            if (autor.IsNull()) return NotFound();

            return Ok(autor);
        }

        [HttpGet("{aggregateId:guid}")]
        public async Task<IActionResult> ObterPorAggregateIdAsync(Guid aggregateId)
        {
            var autor = await _query.ObterPorAsync(aggregateId);
            if (autor.IsNull()) return NotFound();

            return Ok(autor);
        }

        [HttpPut("{aggregateId:guid}")]
        public async Task<IActionResult> AlterarAsync(Guid aggregateId, [FromBody] AutorDto dto)
        {
            await _service.AlterarAsync(aggregateId, dto.Nome);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpPut("{aggregateId:guid}/ativar")]
        public async Task<IActionResult> AtivarAsync(Guid aggregateId)
        {
            await _service.AtivarAsync(aggregateId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpPut("{aggregateId:guid}/desativar")]
        public async Task<IActionResult> DesativarAsync(Guid aggregateId)
        {
            await _service.DesativarAsync(aggregateId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }
    }
}