using MongoDB.Driver;

namespace PruebaTecnicaJaramillo.Server.Repositories
{
    public class MongoDB
    {
        public MongoClient client;
        public IMongoDatabase db;


        //Conexión a la BD
        public MongoDB()
        {
            client = new MongoClient("mongodb://localhost:27017");

            db = client.GetDatabase("prueba");
        }
    }
}
