import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Jerarquia, JerarquiaRelations} from '../models';

export class JerarquiaRepository extends DefaultCrudRepository<
  Jerarquia,
  typeof Jerarquia.prototype.id,
  JerarquiaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Jerarquia, dataSource);
  }
}
