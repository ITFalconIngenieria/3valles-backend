import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Entidad, EntidadRelations} from '../models';

export class EntidadRepository extends DefaultCrudRepository<
  Entidad,
  typeof Entidad.prototype.id,
  EntidadRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Entidad, dataSource);
  }
}
