using Microsoft.EntityFrameworkCore;

namespace BattleShips_API_DiegoCampos.Models
{
    public class PlayerDBContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public PlayerDBContext(DbContextOptions<PlayerDBContext> options)
           : base(options)
        {

        }
    }
}
