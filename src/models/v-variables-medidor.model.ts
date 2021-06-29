import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'vVariablesMedidor'}}
})
export class VVariablesMedidor extends Entity {
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
    precision: 10,
    scale: 0,
    mssql: {columnName: 'quantityId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  quantityId?: number;

  @property({
    type: 'string',
    required: true,
    length: 200,
    mssql: {columnName: 'name', dataType: 'nvarchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VVariablesMedidor>) {
    super(data);
  }
}

export interface VVariablesMedidorRelations {
  // describe navigational properties here
}

export type VVariablesMedidorWithRelations = VVariablesMedidor & VVariablesMedidorRelations;
