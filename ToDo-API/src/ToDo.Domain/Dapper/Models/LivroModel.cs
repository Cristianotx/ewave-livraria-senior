using System;

namespace ToDo.Domain.Dapper.Models
{
    public class LivroModel
    {
        public Guid AggregateId { get; set; }
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Sinopse { get; set; }
        public int Paginas { get; set; }
        public string Capa { get; set; }
        public bool Disponivel { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public int AutorId { get; set; }
        public string Autor { get; set; }
        public int GeneroId { get; set; }
        public string Genero { get; set; }
    }
}