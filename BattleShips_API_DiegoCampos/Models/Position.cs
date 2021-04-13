using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleShips_API_DiegoCampos.Models
{
    public class Position
    {
        public bool hasShip { get; set; }
        public bool attacked { get; set; }
        public int axleX { get; set; }
        public int axleY { get; set; }
    }
}
