import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Variable, VariableRelations, RollOver, VariableMedidor} from '../models';
import {RollOverRepository} from './roll-over.repository';
import {VariableMedidorRepository} from './variable-medidor.repository';

export class VariableRepository extends DefaultCrudRepository<
  Variable,
  typeof Variable.prototype.id,
  VariableRelations
> {

  public readonly rollOvers: HasManyRepositoryFactory<RollOver, typeof Variable.prototype.id>;

  public readonly variableMedidors: HasManyRepositoryFactory<VariableMedidor, typeof Variable.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('RollOverRepository') protected rollOverRepositoryGetter: Getter<RollOverRepository>, @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>,
  ) {
    super(Variable, dataSource);
    this.variableMedidors = this.createHasManyRepositoryFactoryFor('variableMedidors', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidors', this.variableMedidors.inclusionResolver);
    this.rollOvers = this.createHasManyRepositoryFactoryFor('rollOvers', rollOverRepositoryGetter,);
    this.registerInclusionResolver('rollOvers', this.rollOvers.inclusionResolver);
  }
}
