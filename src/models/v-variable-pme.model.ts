import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'vVariablePME'}}})
export class VVariablePme extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 208,
    mssql: {columnName: 'Descripcion', dataType: 'nvarchar', dataLength: 208, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VVariablePme>) {
    super(data);
  }
}

export interface VVariablePmeRelations {
  // describe navigational properties here
}

export type VVariablePmeWithRelations = VVariablePme & VVariablePmeRelations;
