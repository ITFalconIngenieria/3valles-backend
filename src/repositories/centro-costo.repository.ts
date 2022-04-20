import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {CentroCosto, CentroCostoRelations, Factores, Grupos, MedidoresCentroCosto} from '../models';
import {FactoresRepository} from './factores.repository';
import {GruposRepository} from './grupos.repository';
import {MedidoresCentroCostoRepository} from './medidores-centro-costo.repository';

export class CentroCostoRepository extends DefaultCrudRepository<
  CentroCosto,
  typeof CentroCosto.prototype.id,
  CentroCostoRelations
> {

  public readonly factor: BelongsToAccessor<Factores, typeof CentroCosto.prototype.id>;

  public readonly grupos: HasManyRepositoryFactory<Grupos, typeof CentroCosto.prototype.id>;

  public readonly medidoresCentroCostos: HasManyRepositoryFactory<MedidoresCentroCosto, typeof CentroCosto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('FactoresRepository') protected factoresRepositoryGetter: Getter<FactoresRepository>, @repository.getter('GruposRepository') protected gruposRepositoryGetter: Getter<GruposRepository>, @repository.getter('MedidoresCentroCostoRepository') protected medidoresCentroCostoRepositoryGetter: Getter<MedidoresCentroCostoRepository>,
  ) {
    super(CentroCosto, dataSource);
    this.medidoresCentroCostos = this.createHasManyRepositoryFactoryFor('medidoresCentroCostos', medidoresCentroCostoRepositoryGetter,);
    this.registerInclusionResolver('medidoresCentroCostos', this.medidoresCentroCostos.inclusionResolver);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', gruposRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.factor = this.createBelongsToAccessorFor('factor', factoresRepositoryGetter,);
    this.registerInclusionResolver('factor', this.factor.inclusionResolver);
  }
}
