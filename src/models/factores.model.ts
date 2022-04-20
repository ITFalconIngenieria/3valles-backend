import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'factores'}}})
export class Factores extends Entity {
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
    length: -1,
    mssql: {columnName: 'descripcion', dataType: 'varchar', dataLength: -1, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fechaInicial', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaInicial: string;

  @property({
    type: 'date',
    required: true,
    mssql: {columnName: 'fechaFinal', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaFinal: string;

  @property({
    type: 'number',
    precision: 53,
    mssql: {columnName: 'valor', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  valor?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Factores>) {
    super(data);
  }
}

export interface FactoresRelations {
  // describe navigational properties here
}

export type FactoresWithRelations = Factores & FactoresRelations;
