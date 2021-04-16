using BattleShips_API_DiegoCampos.Models;
using System.Collections.Generic;

namespace BattleShips_API_DiegoCampos.Services.Interfaces
{
    public interface IBoardService
    {
        List<Position> CreateBoard(List<Position> board);
        List<Position> GetBoard();
        List<Position> AttackPosition(List<Position> board, int _axleX, int _axleY);
    }
}
