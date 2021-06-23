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
  Variable,
} from '../models';
import {RollOverRepository} from '../repositories';

export class RollOverVariableController {
  constructor(
    @repository(RollOverRepository)
    public rollOverRepository: RollOverRepository,
  ) { }

  @get('/roll-overs/{id}/variable', {
    responses: {
      '200': {
        description: 'Variable belonging to RollOver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Variable)},
          },
        },
      },
    },
  })
  async getVariable(
    @param.path.number('id') id: typeof RollOver.prototype.id,
  ): Promise<Variable> {
    return this.rollOverRepository.variable(id);
  }
}
