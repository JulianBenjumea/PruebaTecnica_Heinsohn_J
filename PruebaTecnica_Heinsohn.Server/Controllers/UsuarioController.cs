using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;
using PruebaTecnica_Heinsohn.Server.Servicios;

namespace PruebaTecnica_Heinsohn.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public int Post([FromBody] Usuario usuario)
        {
            try
            {
                return _usuarioService.postUsuario(usuario);
            }
            catch (Exception)
            {
                return 0;
            }
        }
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            try
            {
                return _usuarioService.GetUsuarios();
            }
            catch (Exception ex) 
            {
                return Enumerable.Empty<Usuario>(); 
            }
        }
        [HttpGet]
        [Route("detalleUsuario")]
        public Usuario detalleUsuario(string nombre)
        {
            try
            {
                return _usuarioService.GetUsuario(nombre);
            }
            catch (Exception)
            {
                return new Usuario();
            }
        }
        [HttpPut]
        public bool put([FromBody] Usuario Usuario)
        {
            try
            {
                return _usuarioService.UpdateUsuario(Usuario);
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpDelete]
        public bool delete(int ID_Usuario)
        {
            try
            {
                return _usuarioService.DeleteUsuario(ID_Usuario);
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpGet]
        [Route("KeyEncrypt")]
        public RespuestaGenerica KeyEncrypt()
        {
            RespuestaGenerica respuesta = new RespuestaGenerica();
            try
            {
                respuesta.respuesta = "OK";
                respuesta.valor = _usuarioService.GetKeyEncrypt();
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

