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
  VariableMedidor,
} from '../models';
import {RollOverRepository} from '../repositories';

export class RollOverVariableMedidorController {
  constructor(
    @repository(RollOverRepository)
    public rollOverRepository: RollOverRepository,
  ) { }

  @get('/roll-overs/{id}/variable-medidor', {
    responses: {
      '200': {
        description: 'VariableMedidor belonging to RollOver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariableMedidor)},
          },
        },
      },
    },
  })
  async getVariableMedidor(
    @param.path.number('id') id: typeof RollOver.prototype.id,
  ): Promise<VariableMedidor> {
    return this.rollOverRepository.variableMedidor(id);
  }
}
