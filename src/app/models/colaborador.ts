import { Colaborador } from 'src/app/models/colaborador';
export interface Colaborador {
  id: number;
  nome: string;
  observacao: string;

  colaborador: Colaborador[];
}
