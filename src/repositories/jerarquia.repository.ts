import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Jerarquia, JerarquiaRelations, MedidorEntidad} from '../models';
import {MedidorEntidadRepository} from './medidor-entidad.repository';

export class JerarquiaRepository extends DefaultCrudRepository<
  Jerarquia,
  typeof Jerarquia.prototype.id,
  JerarquiaRelations
> {

  public readonly medidorEntidads: HasManyRepositoryFactory<MedidorEntidad, typeof Jerarquia.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorEntidadRepository') protected medidorEntidadRepositoryGetter: Getter<MedidorEntidadRepository>,
  ) {
    super(Jerarquia, dataSource);
    this.medidorEntidads = this.createHasManyRepositoryFactoryFor('medidorEntidads', medidorEntidadRepositoryGetter,);
    this.registerInclusionResolver('medidorEntidads', this.medidorEntidads.inclusionResolver);
  }
}
