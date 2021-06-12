import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Medidor, MedidorRelations, RollOver} from '../models';
import {RollOverRepository} from './roll-over.repository';

export class MedidorRepository extends DefaultCrudRepository<
  Medidor,
  typeof Medidor.prototype.id,
  MedidorRelations
> {

  public readonly rollOvers: HasManyRepositoryFactory<RollOver, typeof Medidor.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('RollOverRepository') protected rollOverRepositoryGetter: Getter<RollOverRepository>,
  ) {
    super(Medidor, dataSource);
    this.rollOvers = this.createHasManyRepositoryFactoryFor('rollOvers', rollOverRepositoryGetter,);
    this.registerInclusionResolver('rollOvers', this.rollOvers.inclusionResolver);
  }
}
