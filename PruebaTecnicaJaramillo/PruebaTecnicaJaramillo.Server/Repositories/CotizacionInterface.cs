using PruebaTecnicaJaramillo.Server.Models;

namespace PruebaTecnicaJaramillo.Server.Repositories
{
    public interface CotizacionInterface
    {
        Task GuardarCotizacion(Cotizacion cotizacion);
        Task<int> GetUltimaCotizacion();
        Task<List<Cotizacion>> GetAllCotizaciones();
        Task<List<Cotizacion>> GetCotizacionesByUser(string id);
    }
}
