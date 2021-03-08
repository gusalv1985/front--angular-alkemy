import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Registros } from '../models/registros';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  formularioRegistro: FormGroup;
  modificar: boolean = false;
  egreso: boolean = true;
  registros: Array<Registros> = new Array<Registros>();
  regEgreso: Array<Registros> = new Array<Registros>();
  regIngreso: Array<Registros> = new Array<Registros>();
  readConcepto: string;
  readMonto: number;
  readFecha: Date;
  readTipo: string;
  id: number;

  constructor(private services: ServicesService, private fbgenerator: FormBuilder) { }

  ngOnInit(): void {
    this.formularioRegistro = this.fbgenerator.group({
      concepto: ['', Validators.required],
      monto: ['', Validators.required],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required]
    })
    this.readRegistros();
  }

  readRegistros() {
    this.services.readRegistros().subscribe((reg) => {
      this.registros = reg;
      this.divideRegistros();
    }, error => {
      console.log(error);
    });
  }

  divideRegistros() {
    let j = 0;
    let k = 0;
    for (let i = 0; i < this.registros.length; i++) {
      if (this.registros[i].tipo === "egreso") {
        let reg = this.registros[i];
        this.regEgreso[j] = reg;
        j++;
      }
      if (this.registros[i].tipo === "ingreso") {
        let reg = this.registros[i];
        this.regIngreso[k] = reg;
        k++;
      }
    }
  }

  cambio() {
    this.egreso = !this.egreso;
  }

  modify(id: number) {
    this.id = id;
    this.modificar = !this.modificar;
    this.services.readRegistroxId(id).subscribe((res) => {

      let reg: Array<Registros> = new Array<Registros>();
      reg = res;
      reg.forEach(reg => {
        this.readConcepto = reg.concepto;
        this.readMonto = reg.monto;
        this.readFecha = reg.fecha;
        this.readTipo = reg.tipo;
      });
    });
  }

  modify2() {
    this.modificar = !this.modificar;
  }

  eliminar(id: number) {
    const result = confirm("¿seguro desea eliminar este registro?")
    if (result) {
      this.services.deleteRegistro(id).subscribe((item) => {
        alert("registro eliminado");
        location.reload();
      }, error => {
        alert("ocurrio un error" + error);
      });

    }

  }

  agregar(formValue: any) {
    const carga = new Registros;

    carga.concepto = formValue.concepto
    let pattern = /^[A-Za-z0-9á-ü\s]{1,50}$/;
    if (!pattern.test(carga.concepto)) {
      alert('no se aceptan caracteres especiales');
      return
    }
    carga.monto = formValue.monto
    let patternMonto = /^[0-9]/;
    if (!patternMonto.test(carga.monto.toString())) {
      alert('solo se aceptan numeros');
      return
    }
    carga.fecha = formValue.fecha;
    carga.tipo = formValue.tipo;

    this.services.putRegistro(carga, this.id).subscribe((item) => {
      alert("registro Modificado");
      this.formularioRegistro.reset();
      location.reload();
    }, error => {
      alert("ocurrio un error" + error)
    });

  }

}

