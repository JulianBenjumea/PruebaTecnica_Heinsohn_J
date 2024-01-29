import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/modelos';
import { UsuarioService } from '../services/usuario.service';
import { Util } from '../util/util-encrypt';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService],
})
export class RegistroComponent {

  usuario: Usuario = {
    nombre: "",
    contraseña: "",
    iD_Usuario: 0
  }
  ubicacionEvento: string = "";
  id_evento: any;
  vestimentaEvento: string = "";
  visibleEntrada: boolean = false;
  activoToggle: boolean = false;
  nombreEvento = "";
  vestimentas: any;
  key: string = "";
  claveretorno: string = "";
  constructor(private fb: FormBuilder, private util: Util, private serviceUsuario: UsuarioService, private router: Router) { }
  

  reactiveForm1 = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    contraseña: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    activoToggle: [true]
  });
  encryptar(usuario: Usuario) {
    this.serviceUsuario.getClaveEncrypt().subscribe(result => {
      this.key = result.valor;
      usuario.contraseña = this.util.sendEncrypt(usuario.contraseña!, this.key);
      this.serviceUsuario.postUsuario(usuario).subscribe(result => {
        if (result > 0) {
          alert("Usuario Registrado");
        }
       }, error => console.error(error));
      this.router.navigate(['login']);
    }, error => console.error(error));
    
  }
  Guardar() {
    if (this.reactiveForm1.valid) {
      
      this.usuario.nombre = this.reactiveForm1.get("nombre")?.value;
      this.usuario.contraseña = this.reactiveForm1.get("contraseña")?.value;

      this.serviceUsuario.getUsuario(this.usuario).subscribe(result => {
        if (result != null) {
          if (result.iD_Usuario?.valueOf()! > 0) {
            alert("Nombre de usuario ya registrado");
          }
          else {
            this.encryptar(this.usuario);
          }
        }
        else {
          this.encryptar(this.usuario);
        }
      }, error => console.error(error));

      
    }
    else {
      alert("Revise los valores ingresados");
    }
  }
}
