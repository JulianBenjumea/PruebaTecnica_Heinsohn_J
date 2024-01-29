using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public class TareaService: ITareaService
    {
        private readonly ApplicationDbContext _context;

        public TareaService(ApplicationDbContext context) 
        {
            _context = context;
        }
        public IEnumerable<Tarea> GetTareasUsuario(int ID_Usuario) {
            return _context.Tarea.Where(f => f.ID_Usuario == ID_Usuario).ToList();
        }
        public int SaveTarea(Tarea tarea) {
            _context.Tarea.Add(tarea);
            _context.SaveChanges();
            return tarea.ID_Tarea;
        }
        public bool UpdateTarea(Tarea tarea) {
            _context.Tarea.Update(tarea);
            _context.SaveChanges();
            return true;
        }
        public bool DeleteTarea(int ID_Tarea)
        {
            Tarea Tarea = _context.Tarea.Where(f => f.ID_Tarea == ID_Tarea).FirstOrDefault();
            if (Tarea != null)
            {
                List<Tarea_Estado> tareas_Estado = _context.Tarea_Estado.Where(f => f.ID_Tarea == Tarea.ID_Tarea).ToList();
                _context.Tarea_Estado.RemoveRange(tareas_Estado);
                _context.Tarea.Remove(Tarea);
                _context.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}
