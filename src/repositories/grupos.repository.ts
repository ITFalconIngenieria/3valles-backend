import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Grupos, GruposRelations, Factores, CentroCosto} from '../models';
import {FactoresRepository} from './factores.repository';
import {CentroCostoRepository} from './centro-costo.repository';

export class GruposRepository extends DefaultCrudRepository<
  Grupos,
  typeof Grupos.prototype.id,
  GruposRelations
> {

  public readonly factor: BelongsToAccessor<Factores, typeof Grupos.prototype.id>;

  public readonly centroCosto: BelongsToAccessor<CentroCosto, typeof Grupos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('FactoresRepository') protected factoresRepositoryGetter: Getter<FactoresRepository>, @repository.getter('CentroCostoRepository') protected centroCostoRepositoryGetter: Getter<CentroCostoRepository>,
  ) {
    super(Grupos, dataSource);
    this.centroCosto = this.createBelongsToAccessorFor('centroCosto', centroCostoRepositoryGetter,);
    this.registerInclusionResolver('centroCosto', this.centroCosto.inclusionResolver);
    this.factor = this.createBelongsToAccessorFor('factor', factoresRepositoryGetter,);
    this.registerInclusionResolver('factor', this.factor.inclusionResolver);
  }
}
