using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDo.Domain.Dapper.Queries;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;
using ToDo.Web.Api.Configs;
using ToDo.Web.Api.Dtos;

namespace ToDo.Web.Api.Controllers
{
    [Route("livro")]
    public class LivroController : ApiBaseController
    {
        private readonly ILivroService _livroService;
        private readonly ILivrosQuery _query;

        public LivroController(ILivroService livroService, IUnitOfWork unitOfWork, ILivrosQuery query) : base(unitOfWork)
        {
            _livroService = livroService;
            _query = query;
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] LivroDto dto)
        {
            var aggregateId = Guid.NewGuid();
            await _livroService.CriarAsync(aggregateId, dto.Titulo, dto.Sinopse, dto.Paginas, dto.Capa, dto.AutorId, dto.GeneroId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            var livros = await _query.ObterPorAsync(pagination);
            return Ok(livros);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var livro = await _query.ObterPorAsync(id);
            if (livro.IsNull()) return NotFound();

            return Ok(livro);
        }

        [HttpGet("{aggregateId:guid}")]
        public async Task<IActionResult> ObterPorAggregateIdAsync(Guid aggregateId)
        {
            var livro = await _query.ObterPorAsync(aggregateId);
            if (livro.IsNull()) return NotFound();

            return Ok(livro);
        }

        [HttpPut("{aggregateId:guid}")]
        public async Task<IActionResult> AlterarAsync(Guid aggregateId, [FromBody] LivroDto dto)
        {
            await _livroService.AlterarAsync(aggregateId, dto.Titulo, dto.Sinopse, dto.Paginas, dto.Capa, dto.AutorId, dto.GeneroId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }
    }
}