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
    public class TareaEstadoController : ControllerBase
    {
        private readonly ITareaEstadoService _tareaEstadoService;

        public TareaEstadoController(ITareaEstadoService tareaEstadoService)
        {
            _tareaEstadoService = tareaEstadoService;
        }

        [HttpGet]
        [Route("V_Tareas_Usuarios")]
        public IEnumerable<V_Tareas_Usuarios> V_Tareas_Usuarios(int ID_Usuario)
        {
            try
            {
                return _tareaEstadoService.GetMovimientosUsuario(ID_Usuario);
            }
            catch (Exception)
            {
                return  Enumerable.Empty<V_Tareas_Usuarios>();
            }

        }

        [HttpPost]
        [Route("postMovimientos")]
        public int postMovimientos([FromBody]Tarea_Estado tarea_Estado)
        {
            try
            {
                return _tareaEstadoService.postMovimientos(tarea_Estado);
            }
            catch (Exception)
            {
                return 0;
            }
        }
        [HttpPut]
        [Route("putMovimientos")]
        public RespuestaGenerica putMovimientos([FromBody] Tarea_Estado tarea_Estado)
        {
            RespuestaGenerica respuesta = new RespuestaGenerica();
            try
            {
                _tareaEstadoService.UpdateMovimientos(tarea_Estado);
                respuesta.respuesta = "OK";
                respuesta.valor = "";
                return respuesta;
            }
            catch (Exception ex)
            {
                respuesta.respuesta = "ERROR";
                respuesta.valor = ex.Message;
                return respuesta;
            }
        }
       
    }
}

