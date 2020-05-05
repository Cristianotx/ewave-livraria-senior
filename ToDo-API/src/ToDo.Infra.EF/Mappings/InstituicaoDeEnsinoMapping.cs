using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class InstituicaoDeEnsinoMapping : IEntityTypeConfiguration<InstituicaoDeEnsino>
    {
        public void Configure(EntityTypeBuilder<InstituicaoDeEnsino> builder)
        {
            builder.ToTable(nameof(InstituicaoDeEnsino));

            builder.HasKey(e => e.PessoaId);

            builder.Property(e => e.Cnpj);

            builder
                .HasOne(e => e.Pessoa)
                .WithOne()
                .HasPrincipalKey<Pessoa>(e => e.Id)
                .HasForeignKey<InstituicaoDeEnsino>(e => e.PessoaId);
        }
    }
}