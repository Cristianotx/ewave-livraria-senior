using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Entities;

namespace ToDo.Infra.EF.Mappings
{
    public class LivroMapping : IEntityTypeConfiguration<Livro>
    {
        public void Configure(EntityTypeBuilder<Livro> builder)
        {
            builder.ToTable(nameof(Livro));

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.AggregateId);
            builder.Property(e => e.Titulo);
            builder.Property(e => e.Sinopse);
            builder.Property(e => e.Paginas);
            builder.Property(e => e.Capa);
            builder.Property(e => e.Disponivel);
            builder.Property(e => e.DataCriacao);
            builder.Property(e => e.Ativo);
            builder.Property(e => e.AutorId);
            builder.Property(e => e.GeneroId);

            builder
                .HasOne(e => e.Autor)
                .WithMany()
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.AutorId);

            builder
                .HasOne(e => e.Genero)
                .WithMany()
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.GeneroId);
        }
    }
}