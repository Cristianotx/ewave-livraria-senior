using System.Collections.Generic;

namespace ToDo.Web.Api.Dtos
{
    public class InstituicaoDeEnsinoDto : PessoaDto
    {
        public string Cnpj { get; set; }
        public EnderecoDto Endereco { get; set; }

        public IEnumerable<TelefoneDto> Telefones { get; set; }
        public IEnumerable<EmailDto> Emails { get; set; }
    }
}