import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {VariableMedidor, VariableMedidorRelations, Medidor, Variable, RollOver, MedidorEntidad} from '../models';
import {MedidorRepository} from './medidor.repository';
import {VariableRepository} from './variable.repository';
import {RollOverRepository} from './roll-over.repository';
import {MedidorEntidadRepository} from './medidor-entidad.repository';

export class VariableMedidorRepository extends DefaultCrudRepository<
  VariableMedidor,
  typeof VariableMedidor.prototype.id,
  VariableMedidorRelations
> {

  public readonly medidor: BelongsToAccessor<Medidor, typeof VariableMedidor.prototype.id>;

  public readonly variable: BelongsToAccessor<Variable, typeof VariableMedidor.prototype.id>;

  public readonly rollOvers: HasManyRepositoryFactory<RollOver, typeof VariableMedidor.prototype.id>;

  public readonly medidorEntidads: HasManyRepositoryFactory<MedidorEntidad, typeof VariableMedidor.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorRepository') protected medidorRepositoryGetter: Getter<MedidorRepository>, @repository.getter('VariableRepository') protected variableRepositoryGetter: Getter<VariableRepository>, @repository.getter('RollOverRepository') protected rollOverRepositoryGetter: Getter<RollOverRepository>, @repository.getter('MedidorEntidadRepository') protected medidorEntidadRepositoryGetter: Getter<MedidorEntidadRepository>,
  ) {
    super(VariableMedidor, dataSource);
    this.medidorEntidads = this.createHasManyRepositoryFactoryFor('medidorEntidads', medidorEntidadRepositoryGetter,);
    this.registerInclusionResolver('medidorEntidads', this.medidorEntidads.inclusionResolver);
    this.rollOvers = this.createHasManyRepositoryFactoryFor('rollOvers', rollOverRepositoryGetter,);
    this.registerInclusionResolver('rollOvers', this.rollOvers.inclusionResolver);
    this.variable = this.createBelongsToAccessorFor('variable', variableRepositoryGetter,);
    this.registerInclusionResolver('variable', this.variable.inclusionResolver);
    this.medidor = this.createBelongsToAccessorFor('medidor', medidorRepositoryGetter,);
    this.registerInclusionResolver('medidor', this.medidor.inclusionResolver);
  }
}
