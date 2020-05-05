using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.Infra.EF.Mappings
{
    public class EmailMapping : IEntityTypeConfiguration<Email>
    {
        public void Configure(EntityTypeBuilder<Email> builder)
        {
            builder.ToTable(nameof(Email));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Endereco);
            builder.Property(e => e.TipoId);
            builder.Property(e => e.PessoaId);

            builder
                .HasOne(e => e.Pessoa)
                .WithMany(e => e.Emails)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.PessoaId);

            builder
                .HasOne(e => e.Tipo)
                .WithOne()
                .HasPrincipalKey<EmailTipo>(e => e.Id)
                .HasForeignKey<Email>(e => e.TipoId);
        }
    }
}