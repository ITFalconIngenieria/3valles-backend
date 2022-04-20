import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {MedidoresCentroCosto, MedidoresCentroCostoRelations} from '../models';

export class MedidoresCentroCostoRepository extends DefaultCrudRepository<
  MedidoresCentroCosto,
  typeof MedidoresCentroCosto.prototype.id,
  MedidoresCentroCostoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(MedidoresCentroCosto, dataSource);
  }
}
