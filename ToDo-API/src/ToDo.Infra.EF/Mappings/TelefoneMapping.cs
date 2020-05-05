using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class TelefoneMapping : IEntityTypeConfiguration<Telefone>
    {
        public void Configure(EntityTypeBuilder<Telefone> builder)
        {
            builder.ToTable(nameof(Telefone));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Numero);
            builder.Property(e => e.TipoId);
            builder.Property(e => e.PessoaId);

            builder
                .HasOne(e => e.Pessoa)
                .WithMany(e => e.Telefones)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PessoaId);

            builder
                .HasOne(e => e.Tipo)
                .WithOne()
                .HasPrincipalKey<TelefoneTipo>(e => e.Id)
                .HasForeignKey<Telefone>(e => e.TipoId);
        }
    }
}