import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {MedidorEntidad, MedidorEntidadRelations, VariableMedidor, Entidad, Jerarquia} from '../models';
import {VariableMedidorRepository} from './variable-medidor.repository';
import {EntidadRepository} from './entidad.repository';
import {JerarquiaRepository} from './jerarquia.repository';

export class MedidorEntidadRepository extends DefaultCrudRepository<
  MedidorEntidad,
  typeof MedidorEntidad.prototype.id,
  MedidorEntidadRelations
> {

  public readonly variableMedidor: BelongsToAccessor<VariableMedidor, typeof MedidorEntidad.prototype.id>;

  public readonly entidad: BelongsToAccessor<Entidad, typeof MedidorEntidad.prototype.id>;

  public readonly jerarquia: BelongsToAccessor<Jerarquia, typeof MedidorEntidad.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>, @repository.getter('EntidadRepository') protected entidadRepositoryGetter: Getter<EntidadRepository>, @repository.getter('JerarquiaRepository') protected jerarquiaRepositoryGetter: Getter<JerarquiaRepository>,
  ) {
    super(MedidorEntidad, dataSource);
    this.jerarquia = this.createBelongsToAccessorFor('jerarquia', jerarquiaRepositoryGetter,);
    this.registerInclusionResolver('jerarquia', this.jerarquia.inclusionResolver);
    this.entidad = this.createBelongsToAccessorFor('entidad', entidadRepositoryGetter,);
    this.registerInclusionResolver('entidad', this.entidad.inclusionResolver);
    this.variableMedidor = this.createBelongsToAccessorFor('variableMedidor', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidor', this.variableMedidor.inclusionResolver);
  }
}
