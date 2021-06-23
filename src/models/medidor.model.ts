import {Entity, hasMany, model, property} from '@loopback/repository';
import {RollOver} from './roll-over.model';
import {VariableMedidor} from './variable-medidor.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'medidor'}}})
export class Medidor extends Entity {
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
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'sourceId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  sourceId: number;

  @property({
    type: 'string',
    length: -1,
    mssql: {columnName: 'descripcion', dataType: 'varchar', dataLength: -1, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  descripcion?: string;

  @property({
    type: 'number',
    precision: 53,
    mssql: {columnName: 'lecturaMax', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  lecturaMax?: number;

  @property({
    type: 'number',
    precision: 53,
    mssql: {columnName: 'multiplicador', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  multiplicador?: number;

  @property({
    type: 'string',
    length: -1,
    mssql: {columnName: 'observacion', dataType: 'varchar', dataLength: -1, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  observacion?: string;

  @property({
    type: 'boolean',
    mssql: {columnName: 'tipo', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tipo?: boolean;

  @property({
    type: 'boolean',
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  estado?: boolean;

  @hasMany(() => RollOver)
  rollOvers: RollOver[];

  @hasMany(() => VariableMedidor)
  variableMedidors: VariableMedidor[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Medidor>) {
    super(data);
  }
}

export interface MedidorRelations {
  // describe navigational properties here
}

export type MedidorWithRelations = Medidor & MedidorRelations;
