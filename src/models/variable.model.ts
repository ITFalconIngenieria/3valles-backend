import {Entity, hasMany, model, property} from '@loopback/repository';
import {VariableMedidor} from './variable-medidor.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'variable'}}})
export class Variable extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 250,
    mssql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  @hasMany(() => VariableMedidor)
  variableMedidors: VariableMedidor[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Variable>) {
    super(data);
  }
}

export interface VariableRelations {
  // describe navigational properties here
}

export type VariableWithRelations = Variable & VariableRelations;
