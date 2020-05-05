using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class EmailTipoMapping : IEntityTypeConfiguration<EmailTipo>
    {
        public void Configure(EntityTypeBuilder<EmailTipo> builder)
        {
            builder.ToTable(nameof(EmailTipo));

            builder.HasKey(e => e.Id);
            builder.Property(e => e.Nome);
        }
    }
}