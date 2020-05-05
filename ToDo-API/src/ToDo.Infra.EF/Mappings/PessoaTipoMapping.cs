using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class PessoaTipoMapping : IEntityTypeConfiguration<PessoaTipo>
    {
        public void Configure(EntityTypeBuilder<PessoaTipo> builder)
        {
            builder.ToTable(nameof(PessoaTipo));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nome);
        }
    }
}
