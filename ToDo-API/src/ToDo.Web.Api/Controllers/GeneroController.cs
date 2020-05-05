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
    [Route("genero")]
    public class GeneroController : ApiBaseController
    {
        private readonly IGeneroService _service;
        private readonly IGeneroQuery _query;

        public GeneroController(IGeneroService service, IUnitOfWork unitOfWork, IGeneroQuery query) : base(unitOfWork)
        {
            _service = service;
            _query = query;
        }


        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] GeneroDto dto)
        {
            var aggregateId = Guid.NewGuid();

            await _service.CriarAsync(aggregateId, dto.Nome);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }


        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            var generos = await _query.ObterPorAsync(pagination);
            return Ok(generos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var genero = await _query.ObterPorAsync(id);
            if (genero.IsNull()) return NotFound();

            return Ok(genero);
        }

        [HttpGet("ativos")]
        public async Task<IActionResult> ObterAtivosAsync()
        {
            var generos = await _query.ObterAtivosAsync();
            return Ok(generos);
        }

        [HttpGet("{aggregateId:guid}")]
        public async Task<IActionResult> ObterPorAggregateIdAsync(Guid aggregateId)
        {
            var genero = await _query.ObterPorAsync(aggregateId);
            if (genero.IsNull()) return NotFound();

            return Ok(genero);
        }

        [HttpPut("{aggregateId:guid}")]
        public async Task<IActionResult> AlterarAsync(Guid aggregateId, [FromBody] GeneroDto dto)
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