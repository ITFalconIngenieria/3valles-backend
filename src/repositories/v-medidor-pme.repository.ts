import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VMedidorPme, VMedidorPmeRelations} from '../models';

export class VMedidorPmeRepository extends DefaultCrudRepository<
  VMedidorPme,
  typeof VMedidorPme.prototype.id,
  VMedidorPmeRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VMedidorPme, dataSource);
  }
}
