import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {RollOver, RollOverRelations} from '../models';

export class RollOverRepository extends DefaultCrudRepository<
  RollOver,
  typeof RollOver.prototype.id,
  RollOverRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(RollOver, dataSource);
  }
}
