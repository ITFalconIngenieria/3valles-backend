import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {RollOver, RollOverRelations, Medidor, Variable} from '../models';
import {MedidorRepository} from './medidor.repository';
import {VariableRepository} from './variable.repository';

export class RollOverRepository extends DefaultCrudRepository<
  RollOver,
  typeof RollOver.prototype.id,
  RollOverRelations
> {

  public readonly medidor: BelongsToAccessor<Medidor, typeof RollOver.prototype.id>;

  public readonly variable: BelongsToAccessor<Variable, typeof RollOver.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorRepository') protected medidorRepositoryGetter: Getter<MedidorRepository>, @repository.getter('VariableRepository') protected variableRepositoryGetter: Getter<VariableRepository>,
  ) {
    super(RollOver, dataSource);
    this.variable = this.createBelongsToAccessorFor('variable', variableRepositoryGetter,);
    this.registerInclusionResolver('variable', this.variable.inclusionResolver);
    this.medidor = this.createBelongsToAccessorFor('medidor', medidorRepositoryGetter,);
    this.registerInclusionResolver('medidor', this.medidor.inclusionResolver);
  }
}
