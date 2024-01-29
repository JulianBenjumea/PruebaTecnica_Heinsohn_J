using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public class TareaEstadoService: ITareaEstadoService
    {
        private readonly ApplicationDbContext _context;

        public TareaEstadoService(ApplicationDbContext context) 
        {
            _context = context;
        }

        public IEnumerable<V_Tareas_Usuarios> GetMovimientosUsuario(int ID_Usuario)
        {
            return _context.V_Tareas_Usuarios.Where(f => f.ID_Usuario == ID_Usuario).ToList();
        }
        public int postMovimientos(Tarea_Estado tarea_Estado)
        {
            Tarea_Estado tarea = new Tarea_Estado();
            tarea.ID_Estado = tarea_Estado.ID_Estado;
            tarea.ID_Tarea = tarea_Estado.ID_Tarea;
            tarea.Fecha_Movimiento = DateTime.Now;

            _context.Tarea_Estado.Add(tarea);
            _context.SaveChanges();
            return tarea.ID_Tarea_Estado;
        }
        public bool UpdateMovimientos(Tarea_Estado tarea_Estado)
        {
            Tarea tarea = new Tarea();
            tarea = _context.Tarea.Where(f => f.ID_Tarea == tarea_Estado.ID_Tarea).First();
            tarea.Titulo = tarea_Estado?.Tarea?.Titulo;
            tarea.Descripcion = tarea_Estado?.Tarea?.Descripcion;
            _context.Tarea.Update(tarea);

            V_Tareas_Usuarios v_Tareas_Usuarios = _context.V_Tareas_Usuarios.Where(f => f.ID_Tarea == tarea_Estado.ID_Tarea).First();
            if (tarea_Estado?.Estado?.Nombre != v_Tareas_Usuarios.Estado)
            {
                Tarea_Estado tareaE = new Tarea_Estado();
                tareaE.ID_Estado = tarea_Estado.ID_Estado;
                tareaE.ID_Tarea = tarea_Estado.ID_Tarea;
                tareaE.Fecha_Movimiento = DateTime.Now;
                _context.Tarea_Estado.Add(tareaE);
            }
            _context.SaveChanges();
            return true;
        }
    }
}
