import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'entidad'}}})
export class Entidad extends Entity {
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
    required: true,
    length: 100,
    mssql: {columnName: 'codigo', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  codigo: string;

  @property({
    type: 'string',
    length: 250,
    mssql: {columnName: 'descripcion', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'tipo', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tipo?: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    mssql: {columnName: 'entidad', dataType: 'smallint', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO'},
  })
  entidad: number;

  @property({
    type: 'string',
    length: -1,
    mssql: {columnName: 'observacion', dataType: 'varchar', dataLength: -1, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  observacion?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Entidad>) {
    super(data);
  }
}

export interface EntidadRelations {
  // describe navigational properties here
}

export type EntidadWithRelations = Entidad & EntidadRelations;
