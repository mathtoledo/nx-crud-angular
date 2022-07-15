import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Colaborador } from 'src/app/models/colaborador';
import {ColaboradorService} from "../../../services/colaborador.service";
import {DialogFormColaboradorComponent} from "../dialog-form-colaborador/dialog-form-colaborador.component";

@Component({
  selector: 'app-lista',
  templateUrl: '../../colaborador/lista/lista.component.html',
  styleUrls: ['../../colaborador/lista/lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'observacao', 'acoes'];
  dataSource = new MatTableDataSource([]);
  colaboradors: Colaborador[] = [];

  constructor(private _colaboradorsService: ColaboradorService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listarColaboradors();
  }

  listarColaboradors(): void {

    this._colaboradorsService.listar().subscribe(colaboradors => {
      this.colaboradors = colaboradors;
      this.dataSource = new MatTableDataSource(colaboradors);
    });
  }

  novo(): void {
    const dialogRef = this.dialog.open(DialogFormColaboradorComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaboradors();
      }
    });
  }

  editar(colaborador: Colaborador): void {
    const dialogRef = this.dialog.open(DialogFormColaboradorComponent, {
      data: colaborador
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaboradors();
      }
    });
  }

  excluir(colaborador: Colaborador): void {
    this._colaboradorsService.excluir(colaborador.id).subscribe(response => {
      if (response) {
        this.listarColaboradors();
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
