using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SupportAPI.Models.Entities
{
    public partial class AldifaSoftSupportContext : DbContext
    {
        public AldifaSoftSupportContext()
        {
        }

        public AldifaSoftSupportContext(DbContextOptions<AldifaSoftSupportContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Issue> Issue { get; set; }
        public virtual DbSet<Notes> Notes { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<Supervisor> Supervisor { get; set; }
        public virtual DbSet<Supporter> Supporter { get; set; }
        public virtual DbSet<SupporterService> SupporterService { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=163.178.107.10;Initial Catalog=AldifaSoftSupport;User ID=laboratorios;Password=KmZpo.2796");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>(entity =>
            {
                entity.Property(e => e.Classification)
                    .HasMaxLength(6)
                    .IsFixedLength();

                entity.Property(e => e.CreationDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreationUser).HasMaxLength(20);

                entity.Property(e => e.EmailIssue).HasMaxLength(70);

                entity.Property(e => e.IssueTimeStamp)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PhoneIssue).HasMaxLength(20);

                entity.Property(e => e.Reference).HasMaxLength(20);

                entity.Property(e => e.Status).HasMaxLength(15);

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.UpdateUser).HasMaxLength(20);

                entity.HasOne(d => d.IdServiceNavigation)
                    .WithMany(p => p.Issue)
                    .HasForeignKey(d => d.IdService)
                    .HasConstraintName("FK_Issue_Service");
            });

            modelBuilder.Entity<Notes>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.CreationUser).HasMaxLength(20);

                entity.Property(e => e.NoteTimeStamp).HasColumnType("datetime");

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.UpdateUser).HasMaxLength(20);

                entity.HasOne(d => d.IdIssueNavigation)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.IdIssue)
                    .HasConstraintName("FK_Notes_Issue");

                entity.HasOne(d => d.IdSupervisorNavigation)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.IdSupervisor)
                    .HasConstraintName("FK_Notes_Supervisor");

                entity.HasOne(d => d.IdSupporterNavigation)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.IdSupporter)
                    .HasConstraintName("FK_Notes_Supporter");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.CreationUser).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(20);

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.UpdateUser).HasMaxLength(20);
            });

            modelBuilder.Entity<Supervisor>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.CreationUser).HasMaxLength(20);

                entity.Property(e => e.Email).HasMaxLength(70);

                entity.Property(e => e.FirstSurName).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(20);

                entity.Property(e => e.Password).HasMaxLength(20);

                entity.Property(e => e.SecondSurName).HasMaxLength(20);

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.UpdateUser).HasMaxLength(20);
            });

            modelBuilder.Entity<Supporter>(entity =>
            {
                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.CreationUser).HasMaxLength(20);

                entity.Property(e => e.Email).HasMaxLength(70);

                entity.Property(e => e.FirstSurName).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(20);

                entity.Property(e => e.Password).HasMaxLength(20);

                entity.Property(e => e.SecondSurName).HasMaxLength(20);

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.UpdateUser).HasMaxLength(20);
            });

            modelBuilder.Entity<SupporterService>(entity =>
            {
                entity.HasOne(d => d.IdServiceNavigation)
                    .WithMany(p => p.SupporterService)
                    .HasForeignKey(d => d.IdService)
                    .HasConstraintName("FK_SupporterService_Service");

                entity.HasOne(d => d.IdSupporterNavigation)
                    .WithMany(p => p.SupporterService)
                    .HasForeignKey(d => d.IdSupporter)
                    .HasConstraintName("FK_SupporterService_Supporter");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
