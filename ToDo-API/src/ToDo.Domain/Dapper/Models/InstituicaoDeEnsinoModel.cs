using System;
using System.Collections.Generic;

namespace ToDo.Domain.Dapper.Models
{
    public class InstituicaoDeEnsinoModel
    {
        public int Id { get; set; }
        public Guid AggregateId { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public bool Ativo { get; set; }
        public EnderecoModel Endereco { get; set; }
        public IEnumerable<TelefoneModel> Telefones { get; set; }
        public IEnumerable<EmailModel> Emails { get; set; }
    }
}