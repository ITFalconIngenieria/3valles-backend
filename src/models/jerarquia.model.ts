import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'jerarquia'}}})
export class Jerarquia extends Entity {
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
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'dependenciaId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  dependenciaId?: number;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Jerarquia>) {
    super(data);
  }
}

export interface JerarquiaRelations {
  // describe navigational properties here
}

export type JerarquiaWithRelations = Jerarquia & JerarquiaRelations;
