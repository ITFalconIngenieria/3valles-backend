import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Variable, VariableRelations} from '../models';

export class VariableRepository extends DefaultCrudRepository<
  Variable,
  typeof Variable.prototype.id,
  VariableRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Variable, dataSource);
  }
}
