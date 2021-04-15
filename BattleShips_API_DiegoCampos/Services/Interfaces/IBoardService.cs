using BattleShips_API_DiegoCampos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleShips_API_DiegoCampos.Services.Interfaces
{
    public interface IBoardService
    {
        List<Position> CreateBoard(List<Position> board);
        List<Position> GetBoard();
        List<Position> AttackPosition(List<Position> board, int _axleX, int _axleY);
    }
}
