using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Queries;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;
using ToDo.Web.Api.Configs;
using ToDo.Web.Api.Dtos;
using ToDo.Web.Api.Extensions;

namespace ToDo.Web.Api.Controllers
{
    [Route("instituicao-de-ensino")]
    public class InstituicaoDeEnsinoController : ApiBaseController
    {
        private readonly IInstuicaoDeEnsinoService _service;
        private readonly IInstituicaoDeEnsinoQuery _query;
        private readonly IPessoaService _pessoaService;

        public InstituicaoDeEnsinoController(IInstuicaoDeEnsinoService service, 
            IUnitOfWork unitOfWork, 
            IInstituicaoDeEnsinoQuery query, 
            IPessoaService pessoaService) : base(unitOfWork)
        {
            _service = service;
            _query = query;
            _pessoaService = pessoaService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] InstituicaoDeEnsinoDto dto)
        {
            var aggregateId = Guid.NewGuid();

            await _service.CriarAsync(aggregateId, dto.Nome, dto.Cnpj, dto.Endereco.CidadeId, dto.Endereco.Cep, dto.Endereco.Logradouro, dto.Endereco.Numero, dto.Endereco.Bairro, dto.Endereco.Complemento, dto.Telefones?.ToTuple(), dto.Emails?.ToTuple());
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            var instituicoesDeEnsino = await _query.ObterPorAsync(pagination);
            return Ok(instituicoesDeEnsino);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var insituicaoDeEnsino = await _query.ObterPorAsync(id);
            if (insituicaoDeEnsino.IsNull()) return NotFound();

            return Ok(insituicaoDeEnsino);
        }

        [HttpGet("{aggregateId:guid}")]
        public async Task<IActionResult> ObterPorAggregateIdAsync(Guid aggregateId)
        {
            var insituicaoDeEnsino = await _query.ObterPorAsync(aggregateId);
            if (insituicaoDeEnsino.IsNull()) return NotFound();

            return Ok(insituicaoDeEnsino);
        }

        [HttpPut("{aggregateId:guid}/endereco")]
        public async Task<IActionResult> AlterarEnderecoAsync(Guid aggregateId, [FromBody] EnderecoDto dto)
        {
            await _pessoaService.AlterarEnderecoAsync(aggregateId, dto.CidadeId, dto.Cep, dto.Logradouro, dto.Numero, dto.Bairro, dto.Complemento);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpGet("ativos")]
        public async Task<IActionResult> ObterAtivasAsync()
        {
            var instituicoesDeEnsino = await _query.ObterAtivasAsync();
            return Ok(instituicoesDeEnsino);
        }
        
        [HttpPut("{aggregateId:guid}")]
        public async Task<IActionResult> AlterarAsync(Guid aggregateId, [FromBody] InstituicaoDeEnsinoDto dto)
        {
            await _service.AlterarAsync(aggregateId, dto.Nome, dto.Cnpj);
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

        [HttpPost("{aggregateId:guid}/telefone")]
        public async Task<IActionResult> AdicionarTelefoneAsync(Guid aggregateId, [FromBody]TelefoneDto dto)
        {
            await _pessoaService.AdicionarTelefoneAsync(aggregateId, dto.Numero, dto.TipoId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpPut("{aggregateId:guid}/telefone/{id:int}")]
        public async Task<IActionResult> AlterarTelefoneAsync(Guid aggregateId, int id, [FromBody]TelefoneDto dto)
        {
            await _pessoaService.AlterarTelefoneAsync(aggregateId, id, dto.Numero, dto.TipoId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpDelete("{aggregateId:guid}/telefone/{id:int}")]
        public async Task<IActionResult> RemoverTelefoneAsync(Guid aggregateId, int id)
        {
            await _pessoaService.RemoverTelefoneAsync(aggregateId, id);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpPost("{aggregateId:guid}/email")]
        public async Task<IActionResult> AdicionarEmailAsync(Guid aggregateId, [FromBody]EmailDto dto)
        {
            await _pessoaService.AdicionarEmailAsync(aggregateId, dto.Endereco, dto.TipoId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpPut("{aggregateId:guid}/email/{id:int}")]
        public async Task<IActionResult> AlterarEmailAsync(Guid aggregateId, int id, [FromBody]EmailDto dto)
        {
            await _pessoaService.AlterarEmailAsync(aggregateId, id, dto.Endereco, dto.TipoId);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }

        [HttpDelete("{aggregateId:guid}/email/{id:int}")]
        public async Task<IActionResult> RemoverEmailAsync(Guid aggregateId, int id)
        {
            await _pessoaService.RemoverEmailAsync(aggregateId, id);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }
    }
}
