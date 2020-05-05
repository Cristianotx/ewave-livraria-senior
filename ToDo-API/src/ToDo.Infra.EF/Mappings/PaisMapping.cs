using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class PaisMapping : IEntityTypeConfiguration<Pais>
    {
        public void Configure(EntityTypeBuilder<Pais> builder)
        {
            builder.ToTable(nameof(Pais));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nome);

            builder
                .HasMany(e => e.Estados)
                .WithOne(e => e.Pais)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PaisId);
        }
    }
}