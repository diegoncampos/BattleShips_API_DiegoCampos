using BattleShips_API_DiegoCampos.Models;
using BattleShips_API_DiegoCampos.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace BattleShips_API_DiegoCampos.Services
{
    public class BoardService : IBoardService
    {
        private readonly BoardDBContext _boardDB;
        public BoardService(BoardDBContext context)
        {
            _boardDB = context;
        }
        //Mock board
        List<Position> board = new List<Position>();
        private int columnQuantity = 8;
        private int rowQuantity = 8;

        /// <summary>
        /// Get a new or reset player board with a custom dimensions
        /// </summary>
        /// <param name="_board"></param>
        /// <returns></returns>
        public List<Position> CreateBoard(List<Position> _board)
        {
            // If the Board doesn't exist create It.
            if(_board.Count == 0)
            {
                for (int x = 0; x < columnQuantity; x++)
                {
                    for (int y = 0; y < rowQuantity; y++)
                    {
                        Position pos = new Position() { hasShip = false, attacked = false, x = x, y = y };
                        board.Add(pos);
                        //_boardDB.Board.DefaultIfEmpty();

                        _boardDB.Board.Add(pos);
                        _boardDB.SaveChangesAsync();
                    }
                }
            }
            // If the Board already exist reset It.
            else
            {
                board = _board;
                _board.ForEach(data => 
                {
                    if(data.attacked || data.hasShip)
                    {
                        data.attacked = false;
                        data.hasShip = false;
                        _boardDB.Entry(data).State = EntityState.Modified;
                        _boardDB.SaveChangesAsync();
                    }
                });
            }
            return AddRandomShips(2);
        }

        /// <summary>
        /// Get a player board with a selected quantity of ships added randomly
        /// </summary>
        /// <param name="shipsQuantity"></param>
        /// <returns></returns>
        public List<Position> AddRandomShips(int shipsQuantity)
        {
            Random r = new Random();
            for (int i = 0; i < shipsQuantity; i++)
            {
                int randomX = r.Next(rowQuantity);
                int randomY = r.Next(columnQuantity);
                int positionIndex = board.FindIndex(p => p.x == randomX && p.y == randomY);
                board[positionIndex].hasShip = true;
                _boardDB.Entry(board[positionIndex]).State = EntityState.Modified;
                _boardDB.SaveChangesAsync();
            }
            //_boardDB.Board.Add(board);
            return board;
        }

        /// <summary>
        /// Edit the player board with a selected attacked position
        /// </summary>
        /// <param name="_board"></param>
        /// <param name="_axleX"></param>
        /// <param name="_axleY"></param>
        /// <returns></returns>
        public List<Position> AttackPosition(List<Position> _board, int _axleX, int _axleY)
        {
            board = _board;

            int positionIndex = board.FindIndex(p => p.x == _axleX && p.y == _axleY);
            board[positionIndex].attacked = true;
            //_boardDB.Board.RemoveRange();
            _boardDB.Entry(board[positionIndex]).State = EntityState.Modified;
            _boardDB.SaveChangesAsync();

            return board;
        }

        /// <summary>
        /// Get player board
        /// </summary>
        /// <returns></returns>
        public List<Position> GetBoard()
        {
            
            return board;
        }
    }
}
