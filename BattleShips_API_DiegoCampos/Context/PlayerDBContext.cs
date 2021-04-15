using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
