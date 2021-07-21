import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Entidad, EntidadRelations, MedidorEntidad} from '../models';
import {MedidorEntidadRepository} from './medidor-entidad.repository';

export class EntidadRepository extends DefaultCrudRepository<
  Entidad,
  typeof Entidad.prototype.id,
  EntidadRelations
> {

  public readonly medidorEntidads: HasManyRepositoryFactory<MedidorEntidad, typeof Entidad.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MedidorEntidadRepository') protected medidorEntidadRepositoryGetter: Getter<MedidorEntidadRepository>,
  ) {
    super(Entidad, dataSource);
    this.medidorEntidads = this.createHasManyRepositoryFactoryFor('medidorEntidads', medidorEntidadRepositoryGetter,);
    this.registerInclusionResolver('medidorEntidads', this.medidorEntidads.inclusionResolver);
  }
}
