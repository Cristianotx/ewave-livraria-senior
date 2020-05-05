using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class TelefoneTipoMapping : IEntityTypeConfiguration<TelefoneTipo>
    {
        public void Configure(EntityTypeBuilder<TelefoneTipo> builder)
        {
            builder.ToTable(nameof(TelefoneTipo));

            builder.HasKey(e => e.Id);
            builder.Property(e => e.Nome);
        }
    }
}