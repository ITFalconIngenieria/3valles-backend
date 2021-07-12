import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Medidor, MedidorRelations, VariableMedidor} from '../models';
import {VariableMedidorRepository} from './variable-medidor.repository';

export class MedidorRepository extends DefaultCrudRepository<
  Medidor,
  typeof Medidor.prototype.id,
  MedidorRelations
> {

  public readonly variableMedidors: HasManyRepositoryFactory<VariableMedidor, typeof Medidor.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource
    , @repository.getter('VariableMedidorRepository') protected variableMedidorRepositoryGetter: Getter<VariableMedidorRepository>,
  ) {
    super(Medidor, dataSource);
    this.variableMedidors = this.createHasManyRepositoryFactoryFor('variableMedidors', variableMedidorRepositoryGetter,);
    this.registerInclusionResolver('variableMedidors', this.variableMedidors.inclusionResolver);
  }
}
