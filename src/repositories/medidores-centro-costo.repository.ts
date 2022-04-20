import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {MedidoresCentroCosto, MedidoresCentroCostoRelations, CentroCosto, VariableMedidor} from '../models';
import {CentroCostoRepository} from './centro-costo.repository';
import {VariableMedidorRepository} from './variable-medidor.repository';

export class MedidoresCentroCostoRepository extends DefaultCrudRepository<
  MedidoresCentroCosto,
  typeof MedidoresCentroCosto.prototype.id,
  MedidoresCentroCostoRelations
> {

  public readonly centroCosto: BelongsToAccessor<CentroCosto, typeof MedidoresCentroCosto.prototype.id>;

  public readonly variableMedidor: BelongsToAccessor<VariableMedidor, typeof MedidoresCentroCosto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CentroCostoRepository') protected centroCostoRepositoryGetter: Getter<CentroCostoRepository>, @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>,
  ) {
    super(MedidoresCentroCosto, dataSource);
    this.variableMedidor = this.createBelongsToAccessorFor('variableMedidor', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidor', this.variableMedidor.inclusionResolver);
    this.centroCosto = this.createBelongsToAccessorFor('centroCosto', centroCostoRepositoryGetter,);
    this.registerInclusionResolver('centroCosto', this.centroCosto.inclusionResolver);
  }
}
