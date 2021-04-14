using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BattleShips_API_DiegoCampos.Models
{
    public class Position
    {
        [Key]
        public int id { get; set; }
        public bool hasShip { get; set; }
        public bool attacked { get; set; }
        public int x { get; set; }
        public int y { get; set; }
    }
}
