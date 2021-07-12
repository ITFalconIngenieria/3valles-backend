import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {RollOver, RollOverRelations, VariableMedidor} from '../models';
import {VariableMedidorRepository} from './variable-medidor.repository';

export class RollOverRepository extends DefaultCrudRepository<
  RollOver,
  typeof RollOver.prototype.id,
  RollOverRelations
> {

  public readonly variableMedidor: BelongsToAccessor<VariableMedidor, typeof RollOver.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
    @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>
  ) {
    super(RollOver, dataSource);
    this.variableMedidor = this.createBelongsToAccessorFor('variableMedidor', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidor', this.variableMedidor.inclusionResolver);
  }
}
