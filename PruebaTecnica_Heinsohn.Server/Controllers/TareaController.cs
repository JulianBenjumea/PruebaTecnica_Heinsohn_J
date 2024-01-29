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
    public class TareaController : ControllerBase
    {
        private readonly ITareaService _tareaService;

        public TareaController(ITareaService tareaService)
        {
            _tareaService = tareaService;
        }

        [HttpPost]
        public int Post([FromBody] Tarea Tarea)
        {
            try
            {
               return _tareaService.SaveTarea(Tarea);
            }
            catch (Exception)
            {
                return 0;
            }
        }
        [HttpPut]
        public bool put([FromBody] Tarea Tarea)
        {
            try
            {
                return _tareaService.UpdateTarea(Tarea);
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpDelete]
        public bool delete(int ID_Tarea)
        {
            try
            {
                return _tareaService.DeleteTarea(ID_Tarea);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

