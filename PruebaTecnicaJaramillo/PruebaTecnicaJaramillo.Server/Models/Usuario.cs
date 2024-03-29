﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PruebaTecnicaJaramillo.Server.Models
{
    public class Usuario
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
    }

    public class UsuarioData : Usuario
    {
        public string IdString { get; set; }
    }
}
