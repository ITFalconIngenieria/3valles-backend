import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VMedidorEntidadVariable, VMedidorEntidadVariableRelations} from '../models';

export class VMedidorEntidadVariableRepository extends DefaultCrudRepository<
  VMedidorEntidadVariable,
  typeof VMedidorEntidadVariable.prototype.id,
  VMedidorEntidadVariableRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VMedidorEntidadVariable, dataSource);
  }
}
