import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VVariablePme, VVariablePmeRelations} from '../models';

export class VVariablePmeRepository extends DefaultCrudRepository<
  VVariablePme,
  typeof VVariablePme.prototype.id,
  VVariablePmeRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VVariablePme, dataSource);
  }
}
