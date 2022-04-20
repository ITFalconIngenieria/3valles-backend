import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MedidoresCentroCosto,
  CentroCosto,
} from '../models';
import {MedidoresCentroCostoRepository} from '../repositories';

export class MedidoresCentroCostoCentroCostoController {
  constructor(
    @repository(MedidoresCentroCostoRepository)
    public medidoresCentroCostoRepository: MedidoresCentroCostoRepository,
  ) { }

  @get('/medidores-centro-costos/{id}/centro-costo', {
    responses: {
      '200': {
        description: 'CentroCosto belonging to MedidoresCentroCosto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CentroCosto)},
          },
        },
      },
    },
  })
  async getCentroCosto(
    @param.path.number('id') id: typeof MedidoresCentroCosto.prototype.id,
  ): Promise<CentroCosto> {
    return this.medidoresCentroCostoRepository.centroCosto(id);
  }
}
