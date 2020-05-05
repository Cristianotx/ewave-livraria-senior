using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class EnderecoMapping : IEntityTypeConfiguration<Endereco>
    {
        public void Configure(EntityTypeBuilder<Endereco> builder)
        {
            builder.ToTable(nameof(Endereco));

            builder.HasKey(p => p.PessoaId);

            builder.Property(e => e.Cep);
            builder.Property(e => e.Logradouro);
            builder.Property(e => e.Numero);
            builder.Property(e => e.Bairro);
            builder.Property(e => e.Complemento);

            builder
                .HasOne(e => e.Pessoa)
                .WithOne()
                .HasPrincipalKey<Pessoa>(e => e.Id)
                .HasForeignKey<Endereco>(e => e.PessoaId);

            builder
                .HasOne(e => e.Cidade)
                .WithOne()
                .HasPrincipalKey<Cidade>(e => e.Id)
                .HasForeignKey<Endereco>(e => e.CidadeId);
        }
    }
}