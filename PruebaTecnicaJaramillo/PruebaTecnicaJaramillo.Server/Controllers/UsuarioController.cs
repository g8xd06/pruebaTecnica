using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaJaramillo.Server.Models;
using PruebaTecnicaJaramillo.Server.Repositories;
using System.Diagnostics;

namespace PruebaTecnicaJaramillo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private UsuarioInterface db = new UsuarioCollection();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                return Ok(await db.GetUserById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest("La solicitud no contiene datos de usuario.");
            }

            try
            {
                UsuarioData usuarioData = await db.GetUser(usuario);

                if (usuarioData != null)
                {
                    return Ok(usuarioData);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error interno del servidor.");
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            if (usuario.Username == string.Empty || usuario.Password == string.Empty || usuario.Email == string.Empty)
            {
                return BadRequest();
            }

            usuario.Role = 0;

            await db.CreateUser(usuario);

            return Created("Created", true);
        }
    }
}
