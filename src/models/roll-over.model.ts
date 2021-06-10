import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'rollOver'}}})
export class RollOver extends Entity {
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
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'medidorId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  medidorId: number;

  @property({
    type: 'date',
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fecha?: string;

  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    mssql: {columnName: 'energia', dataType: 'smallint', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO'},
  })
  energia: number;

  @property({
    type: 'string',
    required: true,
    precision: -1,
    mssql: {columnName: 'lecturaAnterior', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  lecturaAnterior: string;

  @property({
    type: 'string',
    precision: -1,
    mssql: {columnName: 'lecturaNueva', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  lecturaNueva?: string;

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

  constructor(data?: Partial<RollOver>) {
    super(data);
  }
}

export interface RollOverRelations {
  // describe navigational properties here
}

export type RollOverWithRelations = RollOver & RollOverRelations;
