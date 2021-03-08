import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Registros } from '../models/registros';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  formRegistros: FormGroup;

  constructor(private service: ServicesService, private fbgenerator: FormBuilder) { }

  ngOnInit(): void {
    this.formRegistros = this.fbgenerator.group({
      concepto: ['', Validators.required],
      monto: ['', Validators.required],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required]
    })
  }

  agregar(formValue: any) {

    const carga = new Registros

    carga.concepto = formValue.concepto
    let pattern = /^[A-Za-z0-9á-ü\s]{1,50}$/;
    if (!pattern.test(carga.concepto)) {
      alert('no se aceptan caracteres especiales');
      return
    }
    carga.monto = formValue.monto;
    let patternNumber = /^[0-9]/;
    if (!patternNumber.test(carga.monto.toString())) {
      alert('solo se aceptan numeros');
      return
    }
    carga.fecha = formValue.fecha;
    carga.tipo = formValue.tipo;

    this.service.saveRegistro(carga).subscribe((item) => {
      alert("registro guardado")
      this.formRegistros.reset();
    }, error => {
      alert("ocurrio un error" +error);
    });

  }
}
