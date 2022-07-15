import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { ColaboradorComponent } from '../../dialog-form-colaborador/colaborador/colaborador.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['identificador', 'nome','observacao','cpf', 'acoes'];
  dataSource = new MatTableDataSource([]);
  colaboradores: Colaborador[] = [];

  constructor(private _colaboradorService: ColaboradorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarColaborador();
  }

  listarColaborador(): void {
    this._colaboradorService.listar().subscribe(colaboradores => {
      this.colaboradores = colaboradores;
      this.dataSource = new MatTableDataSource(colaboradores);
    });
  }

  novo(): void {
    const dialogRef = this.dialog.open(ColaboradorComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaborador();
      }
    });
  }

  editar(colaborador: Colaborador): void {
    const dialogRef = this.dialog.open(ColaboradorComponent, {
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
    // Poderia filtrar usando Object.keys(this.colaboradores).join(" ").toLowerCase() ...
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
