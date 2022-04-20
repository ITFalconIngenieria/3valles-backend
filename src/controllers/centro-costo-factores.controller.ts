import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CentroCosto,
  Factores,
} from '../models';
import {CentroCostoRepository} from '../repositories';

export class CentroCostoFactoresController {
  constructor(
    @repository(CentroCostoRepository)
    public centroCostoRepository: CentroCostoRepository,
  ) { }

  @get('/centro-costos/{id}/factores', {
    responses: {
      '200': {
        description: 'Factores belonging to CentroCosto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factores)},
          },
        },
      },
    },
  })
  async getFactores(
    @param.path.number('id') id: typeof CentroCosto.prototype.id,
  ): Promise<Factores> {
    return this.centroCostoRepository.factor(id);
  }
}
