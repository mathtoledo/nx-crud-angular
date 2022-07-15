import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from '../../../services/colaborador.service';

@Component({
    selector: 'app-dialog-form-colaborador',
    templateUrl: 'dialog-form-colaborador.component.html',
    styleUrls: ['./dialog-form-colaborador.component.scss']
  })
  export class DialogFormColaboradorComponent implements OnInit {
  form!: FormGroup;
  edicao: boolean = false;
  colaboradors: Colaborador[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _colaboradorService: ColaboradorService,
              private _dialogRef: MatDialogRef<DialogFormColaboradorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Colaborador) {

  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', Validators.required],
      observacao: ['', Validators.required],
      colaboradors: [[], Validators.required],
    });

    this.listarColaborador();
    if (this.data) {
      this.edicao = true;
      this.form.patchValue({ ...this.data });
    }
  }

  listarColaborador(): void {
    this._colaboradorService.listar().subscribe(colaborador => {
      this.colaboradors = colaborador;
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const colaborador = { ...this.form.getRawValue() };
    if (this.edicao) {
      colaborador.id = this.data.id;
    }
    this._colaboradorService.salvar(colaborador).subscribe(response => {
      this._dialogRef.close(response);
    });
  }

  compararIds(o1: any, o2: any) {
    if (o1.id == o2.id && o1.id == o2.id)
      return true;
    else return false
  }
}
