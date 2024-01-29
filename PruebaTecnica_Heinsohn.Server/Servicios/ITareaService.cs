using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public interface ITareaService
    {
        IEnumerable<Tarea> GetTareasUsuario(int ID_Usuario);
        int SaveTarea(Tarea tarea);
        bool UpdateTarea(Tarea tarea);
        bool DeleteTarea(int ID_Tarea);

    }
}
