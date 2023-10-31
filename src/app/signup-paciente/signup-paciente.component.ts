import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-signup-paciente',
  templateUrl: './signup-paciente.component.html',
  styleUrls: ['./signup-paciente.component.css']
})
export class SignupPacienteComponent {
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.pacienteForm.valid) {
      const paciente: Paciente = this.pacienteForm.value;
      // Aquí puedes hacer algo con el objeto 'paciente', como enviarlo a tu servidor o almacenarlo localmente.
    }
  }

}
