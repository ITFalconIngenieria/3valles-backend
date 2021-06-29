import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VVariablesMedidor, VVariablesMedidorRelations} from '../models';

export class VVariablesMedidorRepository extends DefaultCrudRepository<
  VVariablesMedidor,
  typeof VVariablesMedidor.prototype.id,
  VVariablesMedidorRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(VVariablesMedidor, dataSource);
  }
}
