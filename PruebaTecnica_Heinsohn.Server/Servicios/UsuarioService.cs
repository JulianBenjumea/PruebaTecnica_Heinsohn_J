using PruebaTecnica_Heinsohn.Data;
using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public class UsuarioService: IUsuarioService
    {
        private readonly ApplicationDbContext _context;

        public UsuarioService(ApplicationDbContext context) 
        {
            _context = context;
        }
        public int postUsuario(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            _context.SaveChanges();
            return usuario.ID_Usuario;
        }
        public IEnumerable<Usuario> GetUsuarios()
        {
            return _context.Usuario.ToList();
        }

        public Usuario GetUsuario(string nombre)
        {
            return _context.Usuario.Where(f=>f.Nombre == nombre).FirstOrDefault();
        }

        public bool UpdateUsuario(Usuario usuario)
        {
            _context.Usuario.Update(usuario);
            _context.SaveChanges();
            return true;
        }
        public bool DeleteUsuario(int ID_Usuario)
        {
            Usuario Usuario = _context.Usuario.Where(f => f.ID_Usuario == ID_Usuario).FirstOrDefault();
            if (Usuario != null)
            {
                _context.Usuario.Remove(Usuario);
                _context.SaveChanges();
                return true;
            }
            else
                return false;
        }
        public string GetKeyEncrypt()
        {
            return _context.getkey();
        }
    }
}
