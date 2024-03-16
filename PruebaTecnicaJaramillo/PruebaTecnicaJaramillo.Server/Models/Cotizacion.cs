using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PruebaTecnicaJaramillo.Server.Models
{
    public class Cotizacion
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("datos_auto")]
        public DatosAuto datos_auto { get; set; }
        [BsonElement("datos_usuario")]
        public DatosUsuario datos_usuario { get; set; }
        [BsonElement("cotizacion")]
        public int cotizacion { get; set; }
        [BsonElement("precio")]
        public double Precio { get; set; }

    }

    public class DatosAuto
    {
        [BsonElement("marca")]
        public string Marca { get; set; }
        [BsonElement("costo")]
        public double Costo { get; set; }
        [BsonElement("modelo")]
        public string Modelo { get; set; }
        [BsonElement("seguro")]
        public string Seguro { get; set; }
        [BsonElement("cobertura")]
        public string Cobertura { get; set; }
        [BsonElement("fabricacion")]
        public int Fabricacion { get; set; }
    }

    public class DatosUsuario
    {
        [BsonElement("nombre")]
        public string Nombre { get; set; }
        [BsonElement("apellido")]
        public string Apellido { get; set; }
        [BsonElement("cedula")]
        public string Cedula { get; set; }
        [BsonElement("nacimiento")]
        public string Nacimiento { get; set; }
        [BsonElement("telefono")]
        public string Telefono { get; set; }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
    }
}
