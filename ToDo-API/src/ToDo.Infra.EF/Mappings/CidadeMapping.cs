using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class CidadeMapping : IEntityTypeConfiguration<Cidade>
    {
        public void Configure(EntityTypeBuilder<Cidade> builder)
        {
            builder.ToTable(nameof(Cidade));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nome);
            builder.Property(e => e.EstadoId);

            builder
                .HasOne(e => e.Estado)
                .WithMany(e => e.Cidades)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.EstadoId);
        }
    }
}