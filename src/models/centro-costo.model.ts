import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'centroCosto'}}})
export class CentroCosto extends Entity {
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
    required: true,
    length: 250,
    mssql: {columnName: 'nombre', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'factorId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  factorId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CentroCosto>) {
    super(data);
  }
}

export interface CentroCostoRelations {
  // describe navigational properties here
}

export type CentroCostoWithRelations = CentroCosto & CentroCostoRelations;
