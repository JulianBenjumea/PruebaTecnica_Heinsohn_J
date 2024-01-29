using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public class EstadoService: IEstadoService
    {
        private readonly ApplicationDbContext _context;

        public EstadoService(ApplicationDbContext context) 
        {
            _context = context;
        }

        public IEnumerable<Estado> GetEstados()
        {
            return _context.Estado.ToList();
        }
    }
}
