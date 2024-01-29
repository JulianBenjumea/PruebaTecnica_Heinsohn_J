using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PruebaTecnica_Heinsohn.Server.Data;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        private string[] args;

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
              : base(options, operationalStoreOptions)

        {

        }
        public string getkey()
        {
            var builder = WebApplication.CreateBuilder(args);
            return builder.Configuration.GetConnectionString("KeyCrypto");
        }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Tarea> Tarea { get; set; }
        public DbSet<Estado> Estado { get; set; }
        public DbSet<Tarea_Estado> Tarea_Estado { get; set; }
        public DbSet<V_Tareas_Usuarios> V_Tareas_Usuarios { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<V_Tareas_Usuarios>()
                .ToView("V_Tareas_Usuarios")
                .HasKey(x=>x.ID_Tarea);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>()
                .HasKey(x => x.ID_Usuario);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Estado>()
                .HasKey(x => x.ID_Estado);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tarea>()
                .HasKey(x => x.ID_Tarea);

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tarea_Estado>()
                .HasKey(x => x.ID_Tarea_Estado);


            modelBuilder.Entity<Tarea>()
           .HasOne(p => p.Usuario)
           .WithMany()
           .HasForeignKey(b => b.ID_Usuario);

            modelBuilder.Entity<Tarea_Estado>()
          .HasOne(p => p.Estado)
          .WithMany()
          .HasForeignKey(b => b.ID_Estado);

            modelBuilder.Entity<Tarea_Estado>()
          .HasOne(p => p.Tarea)
          .WithMany()
          .HasForeignKey(b => b.ID_Tarea);

        }
    }
}
