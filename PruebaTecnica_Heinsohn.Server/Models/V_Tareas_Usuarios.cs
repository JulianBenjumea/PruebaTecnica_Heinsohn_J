namespace PruebaTecnica_Heinsohn.Server.Models
{
    public class V_Tareas_Usuarios
    {
        public int ID_Tarea { get; set; }
        public int ID_Usuario { get; set; }
        public string Usuario { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public DateTime Fecha_Movimiento { get; set; }
    }
}
