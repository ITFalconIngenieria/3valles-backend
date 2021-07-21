import {Entity, model, property, belongsTo} from '@loopback/repository';
import {VariableMedidor} from './variable-medidor.model';
import {Entidad} from './entidad.model';
import {Jerarquia} from './jerarquia.model';

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

  @belongsTo(() => VariableMedidor)
  variableMedidorId: number;

  @belongsTo(() => Entidad)
  entidadId: number;

  @belongsTo(() => Jerarquia)
  jerarquiaId: number;
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
