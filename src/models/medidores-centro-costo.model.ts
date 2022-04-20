import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CentroCosto} from './centro-costo.model';
import {VariableMedidor} from './variable-medidor.model';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'medidoresCentroCosto'}}
})
export class MedidoresCentroCosto extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  id: number;
  @property({
    type: 'number',
    precision: 53,
    mssql: {columnName: 'operacion', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  operacion?: number;

  @belongsTo(() => CentroCosto)
  centroCostoId: number;

  @belongsTo(() => VariableMedidor)
  variableMedidorId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MedidoresCentroCosto>) {
    super(data);
  }
}

export interface MedidoresCentroCostoRelations {
  // describe navigational properties here
}

export type MedidoresCentroCostoWithRelations = MedidoresCentroCosto & MedidoresCentroCostoRelations;
