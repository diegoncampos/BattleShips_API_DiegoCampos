using Microsoft.EntityFrameworkCore;

namespace BattleShips_API_DiegoCampos.Models
{
    public class BoardDBContext : DbContext
    {
        public DbSet<Position> Board { get; set; }
        public BoardDBContext(DbContextOptions<BoardDBContext> options)
           : base(options)
        {

        }
    }
}
