import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {MedidorEntidad, MedidorEntidadRelations} from '../models';

export class MedidorEntidadRepository extends DefaultCrudRepository<
  MedidorEntidad,
  typeof MedidorEntidad.prototype.id,
  MedidorEntidadRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(MedidorEntidad, dataSource);
  }
}
