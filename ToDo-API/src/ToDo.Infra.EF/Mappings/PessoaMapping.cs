using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class PessoaMapping : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.ToTable(nameof(Pessoa));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.Nome);
            builder.Property(e => e.DataCriacao);
            builder.Property(e => e.Ativo);
            builder.Property(e => e.TipoId);

            builder
                .HasOne(e => e.Tipo)
                .WithOne()
                .HasPrincipalKey<PessoaTipo>(e => e.Id)
                .HasForeignKey<Pessoa>(e => e.TipoId);

            builder
                .HasOne(e => e.Endereco)
                .WithOne(e => e.Pessoa)
                .HasPrincipalKey<Pessoa>(e => e.Id)
                .HasForeignKey<Endereco>(e => e.PessoaId);

            builder
                .HasMany(e => e.Emails)
                .WithOne(e => e.Pessoa)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PessoaId);

            builder
                .HasMany(e => e.Telefones)
                .WithOne(e => e.Pessoa)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PessoaId);

        }
    }
}
