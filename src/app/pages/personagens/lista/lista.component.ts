import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Personagem } from 'src/app/models/personagem';
import { PersonagemService } from 'src/app/services/personagem.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['identificador', 'nome', 'acoes'];
  dataSource = new MatTableDataSource([]);
  personagens: Personagem[] = [];

  constructor(private _personagemService: PersonagemService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarPersonagens();
  }

  listarPersonagens(): void {
    this._personagemService.listar().subscribe(personagens => {
      this.personagens = personagens;
      this.dataSource = new MatTableDataSource(personagens);
    });
  }

  novo(): void {
    // const dialogRef = this.dialog.open(DialogFormPersonagemComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.listarPersonagens();
    //   }
    // });
  }

  editar(personagem: Personagem): void {
    // const dialogRef = this.dialog.open(DialogFormPersonagemComponent, {
    //   data: personagem
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.listarPersonagens();
    //   }
    // });
  }

  excluir(personagem: Personagem): void {
    this._personagemService.excluir(personagem.id).subscribe(response => {
      if (response) {
        this.listarPersonagens();
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Poderia filtrar usando Object.keys(this.personagens).join(" ").toLowerCase() ...
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
