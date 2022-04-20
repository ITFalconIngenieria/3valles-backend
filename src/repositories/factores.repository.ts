import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Factores, FactoresRelations} from '../models';

export class FactoresRepository extends DefaultCrudRepository<
  Factores,
  typeof Factores.prototype.id,
  FactoresRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Factores, dataSource);
  }
}
