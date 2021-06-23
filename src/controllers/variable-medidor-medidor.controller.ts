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
  Medidor,
} from '../models';
import {VariableMedidorRepository} from '../repositories';

export class VariableMedidorMedidorController {
  constructor(
    @repository(VariableMedidorRepository)
    public variableMedidorRepository: VariableMedidorRepository,
  ) { }

  @get('/variable-medidors/{id}/medidor', {
    responses: {
      '200': {
        description: 'Medidor belonging to VariableMedidor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medidor)},
          },
        },
      },
    },
  })
  async getMedidor(
    @param.path.number('id') id: typeof VariableMedidor.prototype.id,
  ): Promise<Medidor> {
    return this.variableMedidorRepository.medidor(id);
  }
}
