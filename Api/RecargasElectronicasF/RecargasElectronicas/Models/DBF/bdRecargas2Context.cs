using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RecargasElectronicas.Models.DBF
{
    public partial class bdRecargas2Context : DbContext
    {
        public bdRecargas2Context()
        {
        }

        public bdRecargas2Context(DbContextOptions<bdRecargas2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<TbCompanias> TbCompanias { get; set; }
        public virtual DbSet<TbConciliacion> TbConciliacion { get; set; }
        public virtual DbSet<TbDistribuidores> TbDistribuidores { get; set; }
        public virtual DbSet<TbOpciones> TbOpciones { get; set; }
        public virtual DbSet<TbPerfil> TbPerfil { get; set; }
        public virtual DbSet<TbPines> TbPines { get; set; }
        public virtual DbSet<TbPromociones> TbPromociones { get; set; }
        public virtual DbSet<TbPuntosVenta> TbPuntosVenta { get; set; }
        public virtual DbSet<TbRespuesta> TbRespuesta { get; set; }
        public virtual DbSet<TbServicios> TbServicios { get; set; }
        public virtual DbSet<TbSkuAtt> TbSkuAtt { get; set; }
        public virtual DbSet<TbSkuMazTi> TbSkuMazTi { get; set; }
        public virtual DbSet<TbSkuMovistar> TbSkuMovistar { get; set; }
        public virtual DbSet<TbSkuRecargaqui> TbSkuRecargaqui { get; set; }
        public virtual DbSet<TbSkuServicios> TbSkuServicios { get; set; }
        public virtual DbSet<TbSkuTelcel> TbSkuTelcel { get; set; }
        public virtual DbSet<TbSkuTuenti> TbSkuTuenti { get; set; }
        public virtual DbSet<TbSkuUnefon> TbSkuUnefon { get; set; }
        public virtual DbSet<TbSkuVirgin> TbSkuVirgin { get; set; }
        public virtual DbSet<TbSkuWeex> TbSkuWeex { get; set; }
        public virtual DbSet<TbSkusPagaqui> TbSkusPagaqui { get; set; }
        public virtual DbSet<TbTickets> TbTickets { get; set; }
        public virtual DbSet<TbTipoUsuario> TbTipoUsuario { get; set; }
        public virtual DbSet<TbUsuarios> TbUsuarios { get; set; }

        // Unable to generate entity type for table 'dbo.tbPermisos'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.tbRecarga'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server =VM0417043\\SQLEXPRESS; Initial Catalog=bdRecargas2;User ID=sa;Password=Rodas$01;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.IntId)
                    .HasColumnName("intId")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<TbCompanias>(entity =>
            {
                entity.HasKey(e => e.IntIdCompania);

                entity.ToTable("tbCompanias");

                entity.Property(e => e.IntIdCompania).HasColumnName("intIdCompania");

                entity.Property(e => e.ImgLogo).HasColumnName("imgLogo");

                entity.Property(e => e.StrDescripcion)
                    .IsRequired()
                    .HasColumnName("strDescripcion")
                    .HasMaxLength(50);

                entity.Property(e => e.StrStatus)
                    .IsRequired()
                    .HasColumnName("strStatus")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbConciliacion>(entity =>
            {
                entity.HasKey(e => e.IntIdConciliacion);

                entity.ToTable("tbConciliacion");

                entity.Property(e => e.IntIdConciliacion).HasColumnName("intIdConciliacion");

                entity.Property(e => e.StrCarrier)
                    .HasColumnName("strCarrier")
                    .HasMaxLength(50);

                entity.Property(e => e.StrFecha)
                    .HasColumnName("strFecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.StrMonto)
                    .HasColumnName("strMonto")
                    .HasMaxLength(50);

                entity.Property(e => e.StrOpAccount)
                    .HasColumnName("strOpAccount")
                    .HasMaxLength(50);

                entity.Property(e => e.StrOpAuthorization)
                    .HasColumnName("strOpAuthorization")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbDistribuidores>(entity =>
            {
                entity.HasKey(e => e.IntIdDistribuidor);

                entity.ToTable("tbDistribuidores");

                entity.HasIndex(e => e.IntIdDistribuidor)
                    .HasName("IX_tbDistribuidores");

                entity.Property(e => e.IntIdDistribuidor).HasColumnName("intIdDistribuidor");

                entity.Property(e => e.StrApm)
                    .IsRequired()
                    .HasColumnName("strApm")
                    .HasMaxLength(50);

                entity.Property(e => e.StrApp)
                    .IsRequired()
                    .HasColumnName("strApp")
                    .HasMaxLength(50);

                entity.Property(e => e.StrNombre)
                    .IsRequired()
                    .HasColumnName("strNombre")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbOpciones>(entity =>
            {
                entity.HasKey(e => e.IntIdOpcion);

                entity.ToTable("tbOpciones");

                entity.Property(e => e.IntIdOpcion).HasColumnName("intIdOpcion");

                entity.Property(e => e.BitStatus).HasColumnName("bitStatus");

                entity.Property(e => e.StrOpcion)
                    .IsRequired()
                    .HasColumnName("strOpcion")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbPerfil>(entity =>
            {
                entity.HasKey(e => e.IntIdPerfil);

                entity.ToTable("tbPerfil");

                entity.Property(e => e.IntIdPerfil).HasColumnName("intIdPerfil");

                entity.Property(e => e.BitStatus).HasColumnName("bitStatus");

                entity.Property(e => e.StrDescripcion)
                    .IsRequired()
                    .HasColumnName("strDescripcion")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbPines>(entity =>
            {
                entity.HasKey(e => e.IntIdPines);

                entity.ToTable("tbPines");

                entity.Property(e => e.IntIdPines)
                    .HasColumnName("intIdPines")
                    .ValueGeneratedNever();

                entity.Property(e => e.StrNombrePin)
                    .IsRequired()
                    .HasColumnName("strNombrePin")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuPin)
                    .IsRequired()
                    .HasColumnName("strSkuPin")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbPromociones>(entity =>
            {
                entity.HasKey(e => e.IntIdPromocion);

                entity.ToTable("tbPromociones");

                entity.Property(e => e.IntIdPromocion)
                    .HasColumnName("intIdPromocion")
                    .ValueGeneratedNever();

                entity.Property(e => e.StrCodigo)
                    .IsRequired()
                    .HasColumnName("strCodigo")
                    .HasMaxLength(50);

                entity.Property(e => e.StrStatus)
                    .IsRequired()
                    .HasColumnName("strStatus")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbPuntosVenta>(entity =>
            {
                entity.HasKey(e => e.IntIdPunVenta);

                entity.ToTable("tbPuntosVenta");

                entity.Property(e => e.IntIdPunVenta).HasColumnName("intIdPunVenta");

                entity.Property(e => e.IntIdResponsable).HasColumnName("intIdResponsable");

                entity.Property(e => e.StrCalle)
                    .IsRequired()
                    .HasColumnName("strCalle")
                    .HasMaxLength(50);

                entity.Property(e => e.StrCodPos)
                    .IsRequired()
                    .HasColumnName("strCodPos")
                    .HasMaxLength(50);

                entity.Property(e => e.StrColonia)
                    .IsRequired()
                    .HasColumnName("strColonia")
                    .HasMaxLength(50);

                entity.Property(e => e.StrDescripcion)
                    .IsRequired()
                    .HasColumnName("strDescripcion")
                    .HasMaxLength(50);

                entity.Property(e => e.StrEstado)
                    .IsRequired()
                    .HasColumnName("strEstado")
                    .HasMaxLength(50);

                entity.Property(e => e.StrLatitud)
                    .IsRequired()
                    .HasColumnName("strLatitud")
                    .HasMaxLength(50);

                entity.Property(e => e.StrLongitud)
                    .IsRequired()
                    .HasColumnName("strLongitud")
                    .HasMaxLength(50);

                entity.Property(e => e.StrMunicipio)
                    .IsRequired()
                    .HasColumnName("strMunicipio")
                    .HasMaxLength(50);

                entity.Property(e => e.StrNumExt)
                    .IsRequired()
                    .HasColumnName("strNumExt")
                    .HasMaxLength(50);

                entity.Property(e => e.StrNumInt)
                    .HasColumnName("strNumInt")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbRespuesta>(entity =>
            {
                entity.HasKey(e => e.IntIdRespuesta)
                    .HasName("PK_tbRespuesta_1");

                entity.ToTable("tbRespuesta");

                entity.Property(e => e.IntIdRespuesta).HasColumnName("intIdRespuesta");

                entity.Property(e => e.OpAccount)
                    .HasColumnName("op_account")
                    .HasMaxLength(50);

                entity.Property(e => e.OpAuthorization)
                    .HasColumnName("op_authorization")
                    .HasMaxLength(50);

                entity.Property(e => e.Rcode)
                    .HasColumnName("rcode")
                    .HasMaxLength(50);

                entity.Property(e => e.RcodeDescription)
                    .HasColumnName("rcode_description")
                    .HasMaxLength(50);

                entity.Property(e => e.TransactionId)
                    .HasColumnName("transaction_id")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbServicios>(entity =>
            {
                entity.HasKey(e => e.IntIdServicios);

                entity.ToTable("tbServicios");

                entity.Property(e => e.IntIdServicios)
                    .HasColumnName("intIdServicios")
                    .ValueGeneratedNever();

                entity.Property(e => e.StrNombreServicio)
                    .HasColumnName("strNombreServicio")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuServicio)
                    .HasColumnName("strSkuServicio")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuAtt>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuAtt);

                entity.ToTable("tbSkuAtt");

                entity.Property(e => e.IntIdSkuAtt).HasColumnName("intIdSkuAtt");

                entity.Property(e => e.StrMontoAtt)
                    .IsRequired()
                    .HasColumnName("strMontoAtt")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeAtt)
                    .IsRequired()
                    .HasColumnName("strSkuCodeAtt")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuMazTi>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuMazTi);

                entity.ToTable("tbSkuMazTi");

                entity.Property(e => e.IntIdSkuMazTi).HasColumnName("intIdSkuMazTi");

                entity.Property(e => e.StrMontoMazTi)
                    .IsRequired()
                    .HasColumnName("strMontoMazTi")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeMazTi)
                    .IsRequired()
                    .HasColumnName("strSkuCodeMazTi")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuMovistar>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuMovistar);

                entity.ToTable("tbSkuMovistar");

                entity.Property(e => e.IntIdSkuMovistar).HasColumnName("intIdSkuMovistar");

                entity.Property(e => e.StrMontoMovi)
                    .IsRequired()
                    .HasColumnName("strMontoMovi")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeMovi)
                    .IsRequired()
                    .HasColumnName("strSkuCodeMovi")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuRecargaqui>(entity =>
            {
                entity.HasKey(e => e.IntIdRecargaqui);

                entity.ToTable("tbSkuRecargaqui");

                entity.Property(e => e.IntIdRecargaqui).HasColumnName("intIdRecargaqui");

                entity.Property(e => e.Info)
                    .IsRequired()
                    .HasColumnName("info");

                entity.Property(e => e.Monto)
                    .IsRequired()
                    .HasColumnName("monto")
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Sku)
                    .IsRequired()
                    .HasColumnName("sku")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuServicios>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuServicio);

                entity.ToTable("tbSkuServicios");

                entity.Property(e => e.IntIdSkuServicio).HasColumnName("intIdSkuServicio");

                entity.Property(e => e.StrSkuCodeServicio)
                    .IsRequired()
                    .HasColumnName("strSkuCodeServicio")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuDescripcion)
                    .IsRequired()
                    .HasColumnName("strSkuDescripcion")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuTelcel>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuTelcel);

                entity.ToTable("tbSkuTelcel");

                entity.Property(e => e.IntIdSkuTelcel).HasColumnName("intIdSkuTelcel");

                entity.Property(e => e.Info).HasMaxLength(50);

                entity.Property(e => e.Monto)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Nombre).HasMaxLength(50);

                entity.Property(e => e.Sku)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuTuenti>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuTuenti);

                entity.ToTable("tbSkuTuenti");

                entity.Property(e => e.IntIdSkuTuenti).HasColumnName("intIdSkuTuenti");

                entity.Property(e => e.StrMontoTuenti)
                    .IsRequired()
                    .HasColumnName("strMontoTuenti")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeTuenti)
                    .IsRequired()
                    .HasColumnName("strSkuCodeTuenti")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuUnefon>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuUnefon);

                entity.ToTable("tbSkuUnefon");

                entity.Property(e => e.IntIdSkuUnefon).HasColumnName("intIdSkuUnefon");

                entity.Property(e => e.StrMontoUnefon)
                    .IsRequired()
                    .HasColumnName("strMontoUnefon")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeUnefon)
                    .IsRequired()
                    .HasColumnName("strSkuCodeUnefon")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuVirgin>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuVirgin);

                entity.ToTable("tbSkuVirgin");

                entity.Property(e => e.IntIdSkuVirgin).HasColumnName("intIdSkuVirgin");

                entity.Property(e => e.StrMontoVirgin)
                    .IsRequired()
                    .HasColumnName("strMontoVirgin")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeVirgin)
                    .IsRequired()
                    .HasColumnName("strSkuCodeVirgin")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkuWeex>(entity =>
            {
                entity.HasKey(e => e.IntIdSkuWeex);

                entity.ToTable("tbSkuWeex");

                entity.Property(e => e.IntIdSkuWeex).HasColumnName("intIdSkuWeex");

                entity.Property(e => e.StrMontoWeex)
                    .IsRequired()
                    .HasColumnName("strMontoWeex")
                    .HasMaxLength(50);

                entity.Property(e => e.StrSkuCodeWeex)
                    .IsRequired()
                    .HasColumnName("strSkuCodeWeex")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbSkusPagaqui>(entity =>
            {
                entity.HasKey(e => e.IntIdSkusPagaqui);

                entity.ToTable("tbSkusPagaqui");

                entity.Property(e => e.IntIdSkusPagaqui).HasColumnName("intIdSkusPagaqui");

                entity.Property(e => e.Checksku).HasMaxLength(50);

                entity.Property(e => e.Info).HasMaxLength(50);

                entity.Property(e => e.Maximo).HasMaxLength(50);

                entity.Property(e => e.Minimo).HasMaxLength(50);

                entity.Property(e => e.Monto).HasMaxLength(50);

                entity.Property(e => e.Nombre).HasMaxLength(50);

                entity.Property(e => e.Regex).HasMaxLength(50);

                entity.Property(e => e.Sku).HasMaxLength(50);
            });

            modelBuilder.Entity<TbTickets>(entity =>
            {
                entity.HasKey(e => e.IntIdTicket);

                entity.ToTable("tbTickets");

                entity.Property(e => e.IntIdTicket)
                    .HasColumnName("intIdTicket")
                    .ValueGeneratedNever();

                entity.Property(e => e.DtmFecha)
                    .IsRequired()
                    .HasColumnName("dtmFecha")
                    .HasMaxLength(10);

                entity.Property(e => e.IntIdCodProm).HasColumnName("intIdCodProm");

                entity.Property(e => e.IntIdCompania).HasColumnName("intIdCompania");

                entity.Property(e => e.IntIdUsuario).HasColumnName("intIdUsuario");

                entity.Property(e => e.StrTelefono)
                    .IsRequired()
                    .HasColumnName("strTelefono")
                    .HasMaxLength(50);

                entity.Property(e => e.StrTipo)
                    .IsRequired()
                    .HasColumnName("strTipo")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbTipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IntIdTipoUsuario);

                entity.ToTable("tbTipoUsuario");

                entity.Property(e => e.IntIdTipoUsuario).HasColumnName("intIdTipoUsuario");

                entity.Property(e => e.BitStatus).HasColumnName("bitStatus");

                entity.Property(e => e.StrDescripcion)
                    .IsRequired()
                    .HasColumnName("strDescripcion")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbUsuarios>(entity =>
            {
                entity.HasKey(e => e.IntIdUsuario)
                    .HasName("PK_dbo.tbUsuarios");

                entity.ToTable("tbUsuarios");

                entity.Property(e => e.IntIdUsuario).HasColumnName("intIdUsuario");

                entity.Property(e => e.BitPersonaFiscal).HasColumnName("bitPersonaFiscal");

                entity.Property(e => e.BitSexo).HasColumnName("bitSexo");

                entity.Property(e => e.DtmFechaNac)
                    .HasColumnName("dtmFechaNac")
                    .HasColumnType("smalldatetime");

                entity.Property(e => e.IntIdDistribuidor).HasColumnName("intIdDistribuidor");

                entity.Property(e => e.IntIdPerfil).HasColumnName("intIdPerfil");

                entity.Property(e => e.IntIdPuntoVenta).HasColumnName("intIdPuntoVenta");

                entity.Property(e => e.IntIdTipoUsuario).HasColumnName("intIdTipoUsuario");

                entity.Property(e => e.StrApm)
                    .IsRequired()
                    .HasColumnName("strApm")
                    .HasMaxLength(50);

                entity.Property(e => e.StrApp)
                    .IsRequired()
                    .HasColumnName("strApp")
                    .HasMaxLength(50);

                entity.Property(e => e.StrContrasena)
                    .IsRequired()
                    .HasColumnName("strContrasena")
                    .HasMaxLength(50);

                entity.Property(e => e.StrCorreo)
                    .IsRequired()
                    .HasColumnName("strCorreo")
                    .HasMaxLength(50);

                entity.Property(e => e.StrNombre)
                    .IsRequired()
                    .HasColumnName("strNombre")
                    .HasMaxLength(50);

                entity.Property(e => e.StrRfc)
                    .HasColumnName("strRFC")
                    .HasMaxLength(20);

                entity.Property(e => e.StrTelefono)
                    .IsRequired()
                    .HasColumnName("strTelefono")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IntIdDistribuidorNavigation)
                    .WithMany(p => p.InverseIntIdDistribuidorNavigation)
                    .HasForeignKey(d => d.IntIdDistribuidor)
                    .HasConstraintName("FK_tbUsuarios_tbUsuarios");

                entity.HasOne(d => d.IntIdPuntoVentaNavigation)
                    .WithMany(p => p.TbUsuarios)
                    .HasForeignKey(d => d.IntIdPuntoVenta)
                    .HasConstraintName("FK_tbUsuarios_tbPuntosVenta");

                entity.HasOne(d => d.IntIdTipoUsuarioNavigation)
                    .WithMany(p => p.TbUsuarios)
                    .HasForeignKey(d => d.IntIdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbUsuarios_tbTipoUsuario");
            });
        }
    }
}
