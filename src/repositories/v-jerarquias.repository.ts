import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VJerarquias, VJerarquiasRelations} from '../models';

export class VJerarquiasRepository extends DefaultCrudRepository<
  VJerarquias,
  typeof VJerarquias.prototype.id,
  VJerarquiasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VJerarquias, dataSource);
  }
}
