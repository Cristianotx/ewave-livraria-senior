using System;

namespace ToDo.Domain.Dapper.Models
{
    public class LivroConsultaModel
    {
        public int Id { get; set; }
        public Guid AggregateId { get; set; }
        public string Titulo { get; set; }
        public string Capa { get; set; }
        public bool Ativo { get; set; }
        public bool Disponivel { get; set; }
    }
}