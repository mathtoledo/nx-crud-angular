import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DialogFormColaboradorComponent } from '../dialog-form-colaborador/dialog-form-colaborador.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['identificador', 'nome', 'observacao', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource([]);
  colaborador: Colaborador[] = [];

  constructor(private _colaboradorService: ColaboradorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarColaborador();
  }

  listarColaborador(): void {
    this._colaboradorService.listar().subscribe(colaborador => {
      this.colaborador = colaborador;
      this.dataSource = new MatTableDataSource(colaborador);
    });
  }

  novo(): void {
    const dialogRef = this.dialog.open(DialogFormColaboradorComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaborador();
      }
    });
  }

  editar(colaborador: Colaborador): void {
    const dialogRef = this.dialog.open(DialogFormColaboradorComponent, {
      data: colaborador
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaborador();
      }
    });
  }

  excluir(colaborador: Colaborador): void {
    this._colaboradorService.excluir(colaborador.id).subscribe(response => {
      if (response) {
        this.listarColaborador();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Poderia filtrar usando Object.keys(this.personagens).join(" ").toLowerCase() ...
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
