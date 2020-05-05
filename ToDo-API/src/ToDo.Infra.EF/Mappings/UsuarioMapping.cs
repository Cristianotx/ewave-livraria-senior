using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable(nameof(Usuario));

            builder.HasKey(e => e.PessoaId);

            builder.Property(e => e.Cpf);
            builder.Property(e => e.InstituicaoDeEnsinoId);

            builder
                .HasOne(e => e.Pessoa)
                .WithOne()
                .HasPrincipalKey<Pessoa>(e => e.Id)
                .HasForeignKey<Usuario>(e => e.PessoaId);

            builder
                .HasOne(e => e.InstituicaoDeEnsino)
                .WithOne()
                .HasPrincipalKey<InstituicaoDeEnsino>(e => e.PessoaId)
                .HasForeignKey<Usuario>(e => e.InstituicaoDeEnsinoId);

            builder
                .HasMany(e => e.Emprestimos)
                .WithOne(e => e.Usuario)
                .HasPrincipalKey(e => e.PessoaId)
                .HasForeignKey(e => e.PessoaId);
        }
    }
}