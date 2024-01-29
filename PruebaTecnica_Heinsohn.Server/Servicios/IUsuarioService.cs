using PruebaTecnica_Heinsohn.Server.Models;

namespace PruebaTecnica_Heinsohn.Server.Servicios
{
    public interface IUsuarioService
    {
        int postUsuario(Usuario usuario);
        IEnumerable<Usuario> GetUsuarios();
        Usuario GetUsuario(string nombre);
        bool UpdateUsuario(Usuario usuario);
        public bool DeleteUsuario(int ID_Usuario);
        string GetKeyEncrypt();
    }
}
