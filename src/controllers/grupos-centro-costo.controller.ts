import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupos,
  CentroCosto,
} from '../models';
import {GruposRepository} from '../repositories';

export class GruposCentroCostoController {
  constructor(
    @repository(GruposRepository)
    public gruposRepository: GruposRepository,
  ) { }

  @get('/grupos/{id}/centro-costo', {
    responses: {
      '200': {
        description: 'CentroCosto belonging to Grupos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CentroCosto)},
          },
        },
      },
    },
  })
  async getCentroCosto(
    @param.path.number('id') id: typeof Grupos.prototype.id,
  ): Promise<CentroCosto> {
    return this.gruposRepository.centroCosto(id);
  }
}
