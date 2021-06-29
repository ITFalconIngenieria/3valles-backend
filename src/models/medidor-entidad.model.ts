import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'medidorEntidad'}}
})
export class MedidorEntidad extends Entity {
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
    mssql: {columnName: 'variableMedidorId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  variableMedidorId: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'entidadId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  entidadId: number;

  @property({
    type: 'date',
    mssql: {columnName: 'fechaInicial', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fechaInicial?: string;

  @property({
    type: 'date',
    mssql: {columnName: 'fechaFinal', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fechaFinal?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mssql: {columnName: 'jerarquiaId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  jerarquiaId?: number;

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

  constructor(data?: Partial<MedidorEntidad>) {
    super(data);
  }
}

export interface MedidorEntidadRelations {
  // describe navigational properties here
}

export type MedidorEntidadWithRelations = MedidorEntidad & MedidorEntidadRelations;
