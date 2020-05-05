using System;

namespace ToDo.Domain.Dapper.Models
{
    public class EmprestimoModel
    {
        public int Id { get; set; }
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataVencimento { get; set; }
        public LivroModel Livro { get; set; }
    }
}