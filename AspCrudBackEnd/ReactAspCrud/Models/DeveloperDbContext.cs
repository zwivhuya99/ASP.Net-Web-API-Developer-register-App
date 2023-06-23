//creating a data access layer of my application with EntityFrameworkCore (DbContrext)
using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Models
{
    public class DeveloperDbContext : DbContext
    {
        //creating DeveloperDbContext Constructor, 
        public DeveloperDbContext(DbContextOptions<DeveloperDbContext> options) : base(options)
        {
        }

        //database set (entity set) for my db table (developers model)
        public DbSet<Developers> Developer { get; set; }

       //create data base context
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //data sounce = host , Initial Catalog = name of DB, 
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\Zwi_db; Initial Catalog=ABC developers; TrustServerCertificate= True");
        }
    }
}