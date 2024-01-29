import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../util/util-encrypt';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/modelos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService],
})
export class LoginComponent {

  usuario: Usuario = {
    iD_Usuario: 0,
    contraseña: "",
    nombre: ""
  }

  activoToggle: boolean = false;
  claveretorno: string = "";
  key: string = "";
  constructor(private fb: FormBuilder, private router: Router, private util: Util, private serviceUser: UsuarioService) { }
  

  reactiveForm1 = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    contraseña: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    activoToggle: [true]
  });

  ingresar() {
    if (this.reactiveForm1.valid) {
      this.usuario.contraseña! = this.reactiveForm1.get("contraseña")?.value!;
      this.usuario.nombre! = this.reactiveForm1.get("nombre")?.value!;

      this.serviceUser.getUsuario(this.usuario).subscribe(result => {
        this.usuario = result;
        if (result == null) {
          alert("Usuario Incorrecto");
          return;
        }
        this.serviceUser.getClaveEncrypt().subscribe(result => {
          if (result.respuesta == "OK") {
            this.key = result.valor;
            this.claveretorno = this.util.getDecrypt(this.usuario.contraseña!, this.key);
            if (this.claveretorno == this.reactiveForm1.get("contraseña")?.value!) {
              this.router.navigate(['lista-tareas'], { queryParams: { id_user: this.usuario.iD_Usuario } });
            }
            else {
              alert("Contrseña incorrecta");
            }
          }
          else
            console.log("Error" + result.valor);

        }, error => console.error(error));
      }, error => console.error(error));
    }
    else {
      alert("Revise los valores ingresados");
    }

  }
  nuevoUsuario() {
    this.router.navigate(['registro']);
  }
}
