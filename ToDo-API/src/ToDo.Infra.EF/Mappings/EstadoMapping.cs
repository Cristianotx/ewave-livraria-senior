using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class EstadoMapping : IEntityTypeConfiguration<Estado>
    {
        public void Configure(EntityTypeBuilder<Estado> builder)
        {
            builder.ToTable(nameof(Estado));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nome);
            builder.Property(e => e.Sigla);
            builder.Property(e => e.PaisId);


            builder
                .HasOne(e => e.Pais)
                .WithMany(e => e.Estados)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PaisId);

            builder
                .HasMany(e => e.Cidades)
                .WithOne(e => e.Estado)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.EstadoId);
        }
    }
}