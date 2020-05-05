using System;
using System.Collections.Generic;

namespace ToDo.Web.Api.Dtos
{
    public class UsuarioDto : PessoaDto
    {
        public string Cpf { get; set; }
        public int InstituicaoDeEnsinoId { get; set; }
        public EnderecoDto Endereco { get; set; }

        public IEnumerable<TelefoneDto> Telefones { get; set; }
        public IEnumerable<EmailDto> Emails { get; set; }
    }
}