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
  Factores,
} from '../models';
import {GruposRepository} from '../repositories';

export class GruposFactoresController {
  constructor(
    @repository(GruposRepository)
    public gruposRepository: GruposRepository,
  ) { }

  @get('/grupos/{id}/factores', {
    responses: {
      '200': {
        description: 'Factores belonging to Grupos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factores)},
          },
        },
      },
    },
  })
  async getFactores(
    @param.path.number('id') id: typeof Grupos.prototype.id,
  ): Promise<Factores> {
    return this.gruposRepository.factor(id);
  }
}
