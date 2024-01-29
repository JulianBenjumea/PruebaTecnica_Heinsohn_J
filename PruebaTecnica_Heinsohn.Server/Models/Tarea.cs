namespace PruebaTecnica_Heinsohn.Server.Models
{
    public class Tarea
    {
        public int ID_Tarea { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }

        public int ID_Usuario { get; set; }

        public virtual Usuario? Usuario { get; set; }

    }
}
