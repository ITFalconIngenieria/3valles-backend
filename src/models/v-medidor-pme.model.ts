import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'vMedidorPME'}}})
export class VMedidorPme extends Entity {
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
    type: 'string',
    length: 258,
    mssql: {columnName: 'Descripcion', dataType: 'nvarchar', dataLength: 258, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VMedidorPme>) {
    super(data);
  }
}

export interface VMedidorPmeRelations {
  // describe navigational properties here
}

export type VMedidorPmeWithRelations = VMedidorPme & VMedidorPmeRelations;
