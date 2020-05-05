using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class EmprestimoMapping : IEntityTypeConfiguration<Emprestimo>
    {
        public void Configure(EntityTypeBuilder<Emprestimo> builder)
        {
            builder.ToTable(nameof(Emprestimo));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id);
            builder.Property(e => e.DataEmprestimo);
            builder.Property(e => e.DataVencimento);
            builder.Property(e => e.DataDevolucao);
            builder.Property(e => e.LivroId);
            builder.Property(e => e.PessoaId);

            builder
                .HasOne(e => e.Livro)
                .WithOne()
                .HasPrincipalKey<Livro>(e => e.Id)
                .HasForeignKey<Emprestimo>(e => e.LivroId);

            builder
                .HasOne(e => e.Usuario)
                .WithOne()
                .HasPrincipalKey<Usuario>(e => e.PessoaId)
                .HasForeignKey<Emprestimo>(e => e.PessoaId);
        }
    }
}