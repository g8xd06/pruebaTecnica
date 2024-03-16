using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaJaramillo.Server.Models;
using PruebaTecnicaJaramillo.Server.Repositories;
using System.Diagnostics;

namespace PruebaTecnicaJaramillo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CotizacionController : Controller
    {
        private CotizacionInterface db = new CotizacionCollection();

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCotizaciones()
        {
            try
            {
                return Ok(await db.GetAllCotizaciones());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetCotizacionesByUser(string id)
        {

            try
            {
                return Ok(await db.GetCotizacionesByUser(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("last")]
        public async Task<IActionResult> GetUltimaCotizacion()
        {
            try
            {
                return Ok(await db.GetUltimaCotizacion());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("guardar")]
        public async Task<IActionResult> GuardarCotizacion([FromBody] Cotizacion cotizacion)
        {
            if (cotizacion == null)
            {
                return BadRequest();
            }

            await db.GuardarCotizacion(cotizacion);

            return Created("Saved", true);
        }
    }
}
