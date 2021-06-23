import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VariableMedidor, VariableMedidorRelations} from '../models';

export class VariableMedidorRepository extends DefaultCrudRepository<
  VariableMedidor,
  typeof VariableMedidor.prototype.id,
  VariableMedidorRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VariableMedidor, dataSource);
  }
}
