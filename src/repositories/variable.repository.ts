import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Variable, VariableMedidor, VariableRelations} from '../models';
import {VariableMedidorRepository} from './variable-medidor.repository';

export class VariableRepository extends DefaultCrudRepository<
  Variable,
  typeof Variable.prototype.id,
  VariableRelations
> {

  public readonly variableMedidors: HasManyRepositoryFactory<VariableMedidor, typeof Variable.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>,
  ) {
    super(Variable, dataSource);
    this.variableMedidors = this.createHasManyRepositoryFactoryFor('variableMedidors', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidors', this.variableMedidors.inclusionResolver);
  }
}
