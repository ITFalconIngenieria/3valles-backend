import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VariableMedidor, VariableMedidorRelations, Medidor, Variable} from '../models';
import {MedidorRepository} from './medidor.repository';
import {VariableRepository} from './variable.repository';

export class VariableMedidorRepository extends DefaultCrudRepository<
  VariableMedidor,
  typeof VariableMedidor.prototype.id,
  VariableMedidorRelations
> {

  public readonly medidor: BelongsToAccessor<Medidor, typeof VariableMedidor.prototype.id>;

  public readonly variable: BelongsToAccessor<Variable, typeof VariableMedidor.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorRepository') protected medidorRepositoryGetter: Getter<MedidorRepository>, @repository.getter('VariableRepository') protected variableRepositoryGetter: Getter<VariableRepository>,
  ) {
    super(VariableMedidor, dataSource);
    this.variable = this.createBelongsToAccessorFor('variable', variableRepositoryGetter,);
    this.registerInclusionResolver('variable', this.variable.inclusionResolver);
    this.medidor = this.createBelongsToAccessorFor('medidor', medidorRepositoryGetter,);
    this.registerInclusionResolver('medidor', this.medidor.inclusionResolver);
  }
}
