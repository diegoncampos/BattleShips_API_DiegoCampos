using System.ComponentModel.DataAnnotations;

namespace BattleShips_API_DiegoCampos.Models
{
    public class Player
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Score { get; set; }

        [Required]
        public int GamesPlayed { get; set; }
    }
}
