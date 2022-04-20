import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Factores, FactoresRelations, CentroCosto, Grupos} from '../models';
import {CentroCostoRepository} from './centro-costo.repository';
import {GruposRepository} from './grupos.repository';

export class FactoresRepository extends DefaultCrudRepository<
  Factores,
  typeof Factores.prototype.id,
  FactoresRelations
> {

  public readonly centroCostos: HasManyRepositoryFactory<CentroCosto, typeof Factores.prototype.id>;

  public readonly grupos: HasManyRepositoryFactory<Grupos, typeof Factores.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CentroCostoRepository') protected centroCostoRepositoryGetter: Getter<CentroCostoRepository>, @repository.getter('GruposRepository') protected gruposRepositoryGetter: Getter<GruposRepository>,
  ) {
    super(Factores, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', gruposRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.centroCostos = this.createHasManyRepositoryFactoryFor('centroCostos', centroCostoRepositoryGetter,);
    this.registerInclusionResolver('centroCostos', this.centroCostos.inclusionResolver);
  }
}
