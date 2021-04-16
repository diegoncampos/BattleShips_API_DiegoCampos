using BattleShips_API_DiegoCampos.Models;
using BattleShips_API_DiegoCampos.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BattleShips_API_DiegoCampos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;
        private readonly BoardDBContext _boardDB;

        public BoardController(IBoardService boardService, BoardDBContext boardDB)
        {
            _boardService = boardService;
            _boardDB = boardDB;
        }

        /// <summary>
        /// Get a new BattleShip Board.
        /// </summary>
        /// <returns>List of Positions</returns>
        [Route("CreateBoard")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> CreateBoardAsync()
        {
            //Return board
            var board = await _boardDB.Board.ToListAsync();
            return Ok(_boardService.CreateBoard(board));
        }

        /// <summary>
        /// Get a BattleShip Board.
        /// </summary>
        /// <returns>List of Positions</returns>
        [Route("GetBoard")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> GetBoard()
        {
            //Return board
            var board = _boardDB.Board.ToListAsync();
            return await board;
        }

        /// <summary>
        /// Attack on a new Position and get the updated Board
        /// </summary>
        /// <returns>List of Positions</returns>
        [Route("Attack/{_axleX}/{_axleY}")]
        [HttpGet]
        public async Task<ActionResult> AttackAsync(int _axleX, int _axleY)
        {
            var board = await _boardDB.Board.ToListAsync();
            return Ok(_boardService.AttackPosition(board, _axleX, _axleY));
        }


    }
}
