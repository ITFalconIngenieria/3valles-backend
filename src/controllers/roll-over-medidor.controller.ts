import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RollOver,
  Medidor,
} from '../models';
import {RollOverRepository} from '../repositories';

export class RollOverMedidorController {
  constructor(
    @repository(RollOverRepository)
    public rollOverRepository: RollOverRepository,
  ) { }

  @get('/roll-overs/{id}/medidor', {
    responses: {
      '200': {
        description: 'Medidor belonging to RollOver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medidor)},
          },
        },
      },
    },
  })
  async getMedidor(
    @param.path.number('id') id: typeof RollOver.prototype.id,
  ): Promise<Medidor> {
    return this.rollOverRepository.medidor(id);
  }
}
