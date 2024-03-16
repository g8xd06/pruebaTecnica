using MongoDB.Bson;
using MongoDB.Driver;
using PruebaTecnicaJaramillo.Server.Models;

namespace PruebaTecnicaJaramillo.Server.Repositories
{
    public class UsuarioCollection : UsuarioInterface
    {
        internal MongoDB _repository = new MongoDB();
        private IMongoCollection<Usuario> Collection;

        public UsuarioCollection()
        {
            Collection = _repository.db.GetCollection<Usuario>("usuario");
        }

        public async Task CreateUser(Usuario user)
        {
            await Collection.InsertOneAsync(user);
        }
        public async Task<UsuarioData> GetUser(Usuario user)
        {

            var filter = Builders<Usuario>.Filter.Eq(u => u.Username, user.Username) &
                         Builders<Usuario>.Filter.Eq(u => u.Password, user.Password);

            try
            {
                var result = await Collection.FindAsync(filter);
                Usuario usuario = await result.FirstOrDefaultAsync();

                if (usuario != null)
                {
                    return new UsuarioData
                    {
                        Id = usuario.Id,
                        Username = usuario.Username,
                        Password = usuario.Password,
                        Email = usuario.Email,
                        Role = usuario.Role,
                        IdString = usuario.Id.ToString()
                    };
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el usuario.", ex);
            }
        }


        public async Task<Usuario> GetUserById(string id)
        {
            return await Collection.FindAsync(
                new BsonDocument { { "_id", new ObjectId(id) } }).Result
                .FirstAsync();
        }
    }
}
