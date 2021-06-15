import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VMedidorVariable, VMedidorVariableRelations} from '../models';

export class VMedidorVariableRepository extends DefaultCrudRepository<
  VMedidorVariable,
  typeof VMedidorVariable.prototype.id,
  VMedidorVariableRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VMedidorVariable, dataSource);
  }
}
