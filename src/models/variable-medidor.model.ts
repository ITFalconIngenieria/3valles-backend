import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Medidor} from './medidor.model';
import {RollOver} from './roll-over.model';
import {Variable} from './variable.model';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'variableMedidor'}}
})
export class VariableMedidor extends Entity {
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
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'quantityId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  quantityId: number;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  @belongsTo(() => Medidor)
  medidorId: number;

  @belongsTo(() => Variable)
  variableId: number;

  @hasMany(() => RollOver)
  rollOvers: RollOver[];
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
