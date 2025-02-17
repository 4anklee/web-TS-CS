using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public virtual DbSet<User> Users { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "john.doe",
                Password = "hashedPassword123", // In real app, use proper password hashing
                Email = "john.doe@example.com",
                FirstName = "John",
                LastName = "Doe"
            }
        );
    }
}



