using MongoDB.Bson;
using MongoDB.Driver;
using PruebaTecnicaJaramillo.Server.Models;
using System.Diagnostics;

namespace PruebaTecnicaJaramillo.Server.Repositories
{
    public class CotizacionCollection : CotizacionInterface
    {
        internal MongoDB _repository = new MongoDB();
        private IMongoCollection<Cotizacion> Collection;

        public CotizacionCollection()
        {
            Collection = _repository.db.GetCollection<Cotizacion>("cotizacion");
        }

        public async Task<List<Cotizacion>> GetAllCotizaciones()
        {
            return await Collection.FindAsync(new BsonDocument()).Result.ToListAsync();
        }

        public async Task<List<Cotizacion>> GetCotizacionesByUser(string id)
        {
            var filter = Builders<Cotizacion>.Filter.Eq("datos_usuario._id", new ObjectId(id));
            return await Collection.FindAsync(filter).Result.ToListAsync();
        }

        public async Task<int> GetUltimaCotizacion()
        {
            var filter = Builders<Cotizacion>.Filter.Empty;
            var sort = Builders<Cotizacion>.Sort.Descending("_id");

            var cotizacion = await Collection.Find(filter)
                                     .Sort(sort)
                                     .Limit(1)
                                     .Project(c => c.cotizacion)
                                     .FirstOrDefaultAsync();

            if (cotizacion > 0)
            {
                return cotizacion;
            }
            else
            {
                return 0;
            }
        }

        public async Task GuardarCotizacion(Cotizacion cotizacion)
        {
            await Collection.InsertOneAsync(cotizacion);
        }
    }
}
