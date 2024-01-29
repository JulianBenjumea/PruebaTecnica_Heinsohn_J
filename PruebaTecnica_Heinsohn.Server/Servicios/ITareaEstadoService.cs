using Microsoft.AspNetCore.Mvc;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public interface ITareaEstadoService
    {
        IEnumerable<V_Tareas_Usuarios> GetMovimientosUsuario(int ID_Usuario);
        public int postMovimientos(Tarea_Estado tarea_Estado);
        public bool UpdateMovimientos(Tarea_Estado tarea_Estado);
    }
}
