using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace webapi.Models
{
    public partial class dataContext : DbContext
    {
        public dataContext()
        {
        }

        public dataContext(DbContextOptions<dataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Chitiethoadon> Chitiethoadon { get; set; }
        public virtual DbSet<Feedback> Feedback { get; set; }
        public virtual DbSet<Hoadon> Hoadon { get; set; }
        public virtual DbSet<Log> Log { get; set; }
        public virtual DbSet<Sanpham> Sanpham { get; set; }
        public virtual DbSet<Taikhoan> Taikhoan { get; set; }
        public virtual DbSet<Thuonghieu> Thuonghieu { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-954VFNK\\SQLEXPRESS;Database=data;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chitiethoadon>(entity =>
            {
                entity.HasKey(e => e.Idcthd)
                    .HasName("PK__Chitieth__4EF633973A81B327");

                entity.Property(e => e.Idcthd).HasColumnName("idcthd");

                entity.Property(e => e.Idhd).HasColumnName("idhd");

                entity.Property(e => e.Idsp).HasColumnName("idsp");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdhdNavigation)
                    .WithMany(p => p.Chitiethoadon)
                    .HasForeignKey(d => d.Idhd)
                    .HasConstraintName("fk_hd_idhd");

                entity.HasOne(d => d.IdspNavigation)
                    .WithMany(p => p.Chitiethoadon)
                    .HasForeignKey(d => d.Idsp)
                    .HasConstraintName("fk2_sp_idsp");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.Idfb)
                    .HasName("PK__Feedback__9DB7BA4E22AA2996");

                entity.Property(e => e.Idfb).HasColumnName("idfb");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkh).HasColumnName("idkh");

                entity.Property(e => e.Idsp).HasColumnName("idsp");

                entity.Property(e => e.Message)
                    .HasColumnName("message")
                    .HasMaxLength(100);

                entity.Property(e => e.Rating).HasColumnName("rating");
            });

            modelBuilder.Entity<Hoadon>(entity =>
            {
                entity.HasKey(e => e.Idhd)
                    .HasName("PK__Hoadon__9DB78A0E35BCFE0A");

                entity.Property(e => e.Idhd).HasColumnName("idhd");

                entity.Property(e => e.Diachi)
                    .HasColumnName("diachi")
                    .HasMaxLength(100);

                entity.Property(e => e.Idkh).HasColumnName("idkh");

                entity.Property(e => e.Ngay)
                    .HasColumnName("ngay")
                    .HasColumnType("datetime");

                entity.Property(e => e.Tinhtrang)
                    .HasColumnName("tinhtrang")
                    .HasMaxLength(10);

                entity.Property(e => e.Tonggia)
                    .HasColumnName("tonggia")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdkhNavigation)
                    .WithMany(p => p.Hoadon)
                    .HasForeignKey(d => d.Idkh)
                    .HasConstraintName("fk3_kh_idkh");
            });

            modelBuilder.Entity<Log>(entity =>
            {
                entity.HasKey(e => e.Idlog)
                    .HasName("PK__Log__07BE4DF8267ABA7A");

                entity.Property(e => e.Idlog).HasColumnName("idlog");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Idkh).HasColumnName("idkh");

                entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasMaxLength(20);

                entity.Property(e => e.Message)
                    .HasColumnName("message")
                    .HasMaxLength(100);

                entity.Property(e => e.Roles).HasColumnName("roles");
            });

            modelBuilder.Entity<Sanpham>(entity =>
            {
                entity.HasKey(e => e.Idsp)
                    .HasName("PK__Sanpham__9DBB2CF22A4B4B5E");

                entity.Property(e => e.Idsp).HasColumnName("idsp");

                entity.Property(e => e.Camera)
                    .HasColumnName("camera")
                    .HasMaxLength(100);

                entity.Property(e => e.Cauhinh)
                    .HasColumnName("cauhinh")
                    .HasMaxLength(100);

                entity.Property(e => e.Gia)
                    .HasColumnName("gia")
                    .HasColumnType("money");

                entity.Property(e => e.Hedieuhanh)
                    .HasColumnName("hedieuhanh")
                    .HasMaxLength(100);

                entity.Property(e => e.Hinhanh)
                    .HasColumnName("hinhanh")
                    .HasColumnType("text");

                entity.Property(e => e.Idth).HasColumnName("idth");

                entity.Property(e => e.Manhinh)
                    .HasColumnName("manhinh")
                    .HasMaxLength(100);

                entity.Property(e => e.Mausac)
                    .HasColumnName("mausac")
                    .HasMaxLength(100);

                entity.Property(e => e.Mota)
                    .HasColumnName("mota")
                    .HasMaxLength(2000);

                entity.Property(e => e.Pin)
                    .HasColumnName("pin")
                    .HasMaxLength(100);

                entity.Property(e => e.Sl).HasColumnName("sl");

                entity.Property(e => e.Tensp)
                    .HasColumnName("tensp")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Taikhoan>(entity =>
            {
                entity.HasKey(e => e.Idkh)
                    .HasName("PK__Taikhoan__9DB77D6C31EC6D26");

                entity.Property(e => e.Idkh).HasColumnName("idkh");

                entity.Property(e => e.Cmnd)
                    .HasColumnName("cmnd")
                    .HasMaxLength(9);

                entity.Property(e => e.Diachi)
                    .HasColumnName("diachi")
                    .HasMaxLength(200);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(200);

                entity.Property(e => e.Gioitinh)
                    .HasColumnName("gioitinh")
                    .HasMaxLength(5);

                entity.Property(e => e.Hoten)
                    .HasColumnName("hoten")
                    .HasMaxLength(500);

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("ngaysinh")
                    .HasColumnType("datetime");

                entity.Property(e => e.Pass)
                    .HasColumnName("pass")
                    .HasMaxLength(20);

                entity.Property(e => e.Roles)
                    .HasColumnName("roles")
                    .HasMaxLength(20);

                entity.Property(e => e.Sdt)
                    .HasColumnName("sdt")
                    .HasMaxLength(11);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Thuonghieu>(entity =>
            {
                entity.HasKey(e => e.Idth)
                    .HasName("PK__Thuonghi__9DBB24DB2E1BDC42");

                entity.Property(e => e.Idth).HasColumnName("idth");

                entity.Property(e => e.Logo)
                    .HasColumnName("logo")
                    .HasColumnType("text");

                entity.Property(e => e.Mota)
                    .HasColumnName("mota")
                    .HasMaxLength(2000);

                entity.Property(e => e.Tenth)
                    .HasColumnName("tenth")
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
