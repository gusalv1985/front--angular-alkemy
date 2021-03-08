import { Component, OnInit } from '@angular/core';
import { Registros } from '../models/registros';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registros: Array<Registros> = new Array<Registros>();
  lastRecords: Array<Registros> = new Array<Registros>();
  result: number;
  sumaEgreso: number = 0;
  sumaIngreso: number = 0;

  constructor(private services: ServicesService) { }

  ngOnInit(): void {
    this.services.readRegistros().subscribe((reg) => {
      console.log(reg)
      this.registros = reg;
      this.lastTen();
      this.balance();
    }, error => {
      console.log(error)
    })

  }

  lastTen() {
    let max = this.registros.length
    let min = (max - 10)
    let n = 0
    for (let i = min; i < max; i++) {
      let reg = this.registros[i];
      this.lastRecords[n] = reg;
      n++;
    }
  }

  balance() {
    this.registros.forEach(e => {
      if (e.tipo == "egreso") {
        this.sumaEgreso += e.monto;
      }
      if (e.tipo == "ingreso") {
        this.sumaIngreso += e.monto;
      }
    });

    this.result = (this.sumaIngreso - this.sumaEgreso)
  }

}
