import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MedidorEntidad,
  VariableMedidor,
} from '../models';
import {MedidorEntidadRepository} from '../repositories';

export class MedidorEntidadVariableMedidorController {
  constructor(
    @repository(MedidorEntidadRepository)
    public medidorEntidadRepository: MedidorEntidadRepository,
  ) { }

  @get('/medidor-entidads/{id}/variable-medidor', {
    responses: {
      '200': {
        description: 'VariableMedidor belonging to MedidorEntidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariableMedidor)},
          },
        },
      },
    },
  })
  async getVariableMedidor(
    @param.path.number('id') id: typeof MedidorEntidad.prototype.id,
  ): Promise<VariableMedidor> {
    return this.medidorEntidadRepository.variableMedidor(id);
  }
}
