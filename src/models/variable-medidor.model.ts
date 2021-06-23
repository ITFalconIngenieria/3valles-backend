import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Medidor} from './medidor.model';
import {Variable} from './variable.model';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'variableMedidor'}}
})
export class VariableMedidor extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  id: number;
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'quantityId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  quantityId: number;

  @belongsTo(() => Medidor)
  medidorId: number;

  @belongsTo(() => Variable)
  variableId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VariableMedidor>) {
    super(data);
  }
}

export interface VariableMedidorRelations {
  // describe navigational properties here
}

export type VariableMedidorWithRelations = VariableMedidor & VariableMedidorRelations;
