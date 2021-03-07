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

  constructor(private services: ServicesService) { }

  ngOnInit(): void {
    this.services.readRegistro().subscribe((reg) => {
      console.log(reg)
      this.registros = reg;
      this.lastTen();
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

}
