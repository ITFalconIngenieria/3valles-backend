import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Medidor} from './medidor.model';
import {Variable} from './variable.model';

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
    type: 'date',
    mssql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fecha?: string;
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

  @belongsTo(() => Medidor)
  medidorId: number;

  @belongsTo(() => Variable)
  variableId: number;
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
