﻿// <auto-generated />
using AzureToolKit2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AzureToolKit2.Migrations
{
    [DbContext(typeof(AzureToolkitContext))]
    [Migration("20200130173625_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AzureToolKit2.Models.Entities.SavedImage", b =>
                {
                    b.Property<int>("SavedImageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("StorageUrl");

                    b.Property<string>("UserId");

                    b.HasKey("SavedImageId");

                    b.ToTable("SavedImages");
                });

            modelBuilder.Entity("AzureToolKit2.Models.Entities.SavedImageTag", b =>
                {
                    b.Property<int>("SavedImageTagId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("SavedImageId");

                    b.Property<string>("Tag");

                    b.HasKey("SavedImageTagId");

                    b.HasIndex("SavedImageId");

                    b.ToTable("SavedImageTags");
                });

            modelBuilder.Entity("AzureToolKit2.Models.Entities.SavedImageTag", b =>
                {
                    b.HasOne("AzureToolKit2.Models.Entities.SavedImage")
                        .WithMany("Tags")
                        .HasForeignKey("SavedImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
