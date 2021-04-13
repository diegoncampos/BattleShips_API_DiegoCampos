using BattleShips_API_DiegoCampos.Models;
using BattleShips_API_DiegoCampos.Services;
using BattleShips_API_DiegoCampos.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BattleShips_API_DiegoCampos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;

        public BoardController(IBoardService boardService)
        {
            _boardService = boardService;
        }

        /// <summary>
        /// Get a new BattleShip Board.
        /// </summary>
        /// <returns>List of Positions</returns>
        [Route("GetBoard")]
        [HttpGet]
        public ActionResult<IEnumerable<Position>> GetNewBoard()
        {
            //Return board
            return Ok(_boardService.GetBoard());
        }

        /// <summary>
        /// Attack on a new Position and get the updated Board
        /// </summary>
        /// <returns>List of Positions</returns>
        [Route("Attack/{_axleX}/{_axleY}")]
        [HttpGet]
        public ActionResult Attack(int _axleX, int _axleY)
        {
            //loadBoard();
            //attackPosition(_axleX, _axleY);
            //var response = new HttpResponseMessage(HttpStatusCode.OK);
            //response.Content = new StringContent(JsonConvert.SerializeObject(board));
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            //return response;
            return Ok(_boardService.AttackPosition(_axleX, _axleY));
        }


    }
}
