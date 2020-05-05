using System;
using ToDo.Infra.Core;

namespace ToDo.Domain.Entities
{
    public class Livro : Entity
    {
        public string Sinopse { get; set; }
        public string Titulo { get; set; }
        public int Paginas { get; set; }
        public string Capa { get; set; }
        public bool Disponivel { get; set; }
        public int AutorId { get; set; }
        public int GeneroId { get; set; }

        public virtual Autor Autor { get; set; }
        public virtual Genero Genero { get; set; }

        public Livro()
        {

        }

        public Livro(Guid aggregateId, string titulo, string sinopse, int paginas, string capa, int autorId, int generoId)
        {
            AggregateId = aggregateId;
            Titulo = titulo;
            Sinopse = sinopse;
            Paginas = paginas;
            Capa = capa;
            Disponivel = true;
            DataCriacao = DateTime.Now;
            Ativo = true;
            AutorId = autorId;
            GeneroId = generoId;
        }

        public void Alterar(string titulo, string sinopse, int paginas, string capa, int autorId, int generoId)
        {
            Titulo = titulo;
            Sinopse = sinopse;
            Paginas = paginas;
            Capa = capa;
            Disponivel = true;
            DataCriacao = DateTime.Now;
            Ativo = true;
            AutorId = autorId;
            GeneroId = generoId;
        }

        public void Indisponibilizar() => Disponivel = false;
        public void Disponibilizar() => Disponivel = true;


        public class NaoEncontradoException : BusinessException
        {
            public NaoEncontradoException() : base("O Usuário não foi encontrado.") { }
        }

        public class IndisponivelException : BusinessException
        {
            public IndisponivelException() : base("O Livro está indísponível para o empréstimo.") { }
        }
    }
}