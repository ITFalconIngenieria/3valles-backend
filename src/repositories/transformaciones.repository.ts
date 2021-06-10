import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Transformaciones, TransformacionesRelations} from '../models';

export class TransformacionesRepository extends DefaultCrudRepository<
  Transformaciones,
  typeof Transformaciones.prototype.id,
  TransformacionesRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Transformaciones, dataSource);
  }
}
