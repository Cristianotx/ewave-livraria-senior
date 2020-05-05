using System;

namespace ToDo.Web.Api.Dtos
{
    public class EmprestimoDto
    {
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataVencimento { get; set; }
        public int LivroId { get; set; }
        public int UsuarioId { get; set; }
    }
}