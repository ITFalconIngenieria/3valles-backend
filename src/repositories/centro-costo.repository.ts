import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {CentroCosto, CentroCostoRelations} from '../models';

export class CentroCostoRepository extends DefaultCrudRepository<
  CentroCosto,
  typeof CentroCosto.prototype.id,
  CentroCostoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(CentroCosto, dataSource);
  }
}
