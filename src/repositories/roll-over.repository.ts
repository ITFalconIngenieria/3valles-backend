import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Medidor, RollOver, RollOverRelations} from '../models';
import {MedidorRepository} from './medidor.repository';

export class RollOverRepository extends DefaultCrudRepository<
  RollOver,
  typeof RollOver.prototype.id,
  RollOverRelations
> {

  public readonly medidor: BelongsToAccessor<Medidor, typeof RollOver.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorRepository') protected medidorRepositoryGetter: Getter<MedidorRepository>,
  ) {
    super(RollOver, dataSource);
    this.medidor = this.createBelongsToAccessorFor('medidor', medidorRepositoryGetter,);
    this.registerInclusionResolver('medidor', this.medidor.inclusionResolver);
  }
}
