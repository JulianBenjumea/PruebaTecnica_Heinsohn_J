using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;
using PruebaTecnica_Heinsohn.Server.Servicios;
using System.Linq;

namespace PruebaTecnica_Heinsohn.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EstadoController : ControllerBase
    {
        private readonly IEstadoService _estadoService;

        public EstadoController(IEstadoService estadoService)
        {
            _estadoService = estadoService;
        }

        [HttpGet]
        public IEnumerable<Estado> Get()
        {
            try
            {
                return _estadoService.GetEstados();
            }
            catch (Exception ex)
            {
                    return Enumerable.Empty<Estado>();
            }
        }
    }
}

