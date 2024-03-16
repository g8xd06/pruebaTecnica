using PruebaTecnicaJaramillo.Server.Models;

namespace PruebaTecnicaJaramillo.Server.Repositories
{
    public interface UsuarioInterface
    {
        Task CreateUser(Usuario user);
        Task<UsuarioData> GetUser(Usuario user);
        Task<Usuario> GetUserById(string id);
    }
}
