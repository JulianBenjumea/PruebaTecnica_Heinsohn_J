using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public interface IEstadoService
    {
        IEnumerable<Estado> GetEstados();
    }
}
