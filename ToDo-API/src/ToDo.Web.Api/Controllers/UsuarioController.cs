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
    [Route("usuario")]
    public class UsuarioController : ApiBaseController
    {
        private readonly IUsuarioService _service;
        private readonly IPessoaService _pessoaService;
        private readonly IUsuarioQuery _query;

        public UsuarioController(IUnitOfWork unitOfWork, IUsuarioService service, IPessoaService pessoaService, IUsuarioQuery query) : base(unitOfWork)
        {
            _service = service;
            _pessoaService = pessoaService;
            _query = query;
        }


        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] UsuarioDto dto)
        {
            var aggregateId = Guid.NewGuid();
            await _service.CriarAsync(aggregateId, dto.Nome, dto.Cpf, dto.InstituicaoDeEnsinoId, dto.Endereco.CidadeId, dto.Endereco.Cep, dto.Endereco.Logradouro, dto.Endereco.Numero, dto.Endereco.Bairro, dto.Endereco.Complemento, dto.Telefones?.ToTuple(), dto.Emails?.ToTuple());
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }
        
        [HttpGet]
        public async Task<IActionResult> ObterPorAsync([FromQuery] Pagination pagination)
        {
            return Ok(await _query.ObterPorAsync(pagination));
        }

        [HttpPut("{aggregateId:guid}")]
        public async Task<IActionResult> AlterarAsync(Guid aggregateId, [FromBody] UsuarioAlterarDto dto)
        {
            await _service.AlterarAsync(aggregateId, dto.Nome, dto.Cpf);
            await UnitOfWork.CommitAsyc();

            return Ok(aggregateId);
        }
        
        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorIdAsync(int id)
        {
            var usuario = await _query.ObterPorAsync(id);
            if (usuario.IsNull()) return NotFound();

            return Ok(usuario);
        }

        [HttpGet("{aggregateId:guid}")]
        public async Task<IActionResult> ObterPorAggregateIdAsync(Guid aggregateId)
        {
            var usuario = await _query.ObterPorAsync(aggregateId);
            if (usuario.IsNull()) return NotFound();

            return Ok(usuario);
        }

        [HttpPut("{aggregateId:guid}/endereco")]
        public async Task<IActionResult> AlterarEnderecoAsync(Guid aggregateId, [FromBody] EnderecoDto dto)
        {
            await _pessoaService.AlterarEnderecoAsync(aggregateId, dto.CidadeId, dto.Cep, dto.Logradouro, dto.Numero, dto.Bairro, dto.Complemento);
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
        public async Task<IActionResult> AlterarTelefoneAsync(Guid aggregateId,int id, [FromBody]TelefoneDto dto)
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