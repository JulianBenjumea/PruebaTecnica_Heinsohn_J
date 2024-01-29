namespace PruebaTecnica_Heinsohn.Server.Models
{
    public class Tarea_Estado
    {
        public int ID_Tarea_Estado { get; set; }
        public int ID_Tarea { get; set; }

        public int ID_Estado { get; set; }

        public DateTime Fecha_Movimiento { get; set; }


        public virtual Tarea? Tarea { get; set; }
        public virtual Estado? Estado { get; set; }
    }
}
