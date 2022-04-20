import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Grupos, GruposRelations} from '../models';

export class GruposRepository extends DefaultCrudRepository<
  Grupos,
  typeof Grupos.prototype.id,
  GruposRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Grupos, dataSource);
  }
}
