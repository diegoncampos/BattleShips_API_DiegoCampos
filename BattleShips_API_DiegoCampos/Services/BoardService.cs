using BattleShips_API_DiegoCampos.Models;
using BattleShips_API_DiegoCampos.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleShips_API_DiegoCampos.Services
{
    public class BoardService : IBoardService
    {
        //Mock board
        List<Position> board = new List<Position>();
        private int columnQuantity = 8;
        private int rowQuantity = 8;
        private int numOfGuesses = 20;

        public List<Position> LoadBoard()
        {
            for (int x = 0; x < columnQuantity; x++)
            {
                for (int y = 0; y < rowQuantity; y++)
                {
                    Position pos = new Position() { hasShip = false, attacked = false, axleX = x, axleY = y };
                    board.Add(pos);
                }
            }

            return AddRandomShips(2);
        }

        public List<Position> AddRandomShips(int shipsQuantity)
        {
            Random r = new Random();
            for (int i = 0; i < shipsQuantity; i++)
            {
                int randomX = r.Next(rowQuantity);
                int randomY = r.Next(columnQuantity);
                int positionIndex = board.FindIndex(p => p.axleX == randomX && p.axleY == randomY);
                board[positionIndex].hasShip = true;
            }

            return board;
        }

        public List<Position> AttackPosition(int _axleX, int _axleY)
        {
            //var pos = board.Contains(new Position { axleX = axleX, axleY = axleY });
            if (board.Count == 0)
            {
                //return new ApiResponse(400, "No Board created!.");
            }
            if (numOfGuesses > 0)
            {
                int positionIndex = board.FindIndex(p => p.axleX == _axleX && p.axleY == _axleY);
                board[positionIndex].attacked = true;
                numOfGuesses --;
            }
            return board;
        }
        public List<Position> GetBoard()
        {
            if (board.Count > 0)
            {
                return board;
            }
            return LoadBoard();
        }

        public int GetNumOfGuesses()
        {
            return numOfGuesses;
        }
    }
}
