import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VariableMedidor,
  Variable,
} from '../models';
import {VariableMedidorRepository} from '../repositories';

export class VariableMedidorVariableController {
  constructor(
    @repository(VariableMedidorRepository)
    public variableMedidorRepository: VariableMedidorRepository,
  ) { }

  @get('/variable-medidors/{id}/variable', {
    responses: {
      '200': {
        description: 'Variable belonging to VariableMedidor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Variable)},
          },
        },
      },
    },
  })
  async getVariable(
    @param.path.number('id') id: typeof VariableMedidor.prototype.id,
  ): Promise<Variable> {
    return this.variableMedidorRepository.variable(id);
  }
}
