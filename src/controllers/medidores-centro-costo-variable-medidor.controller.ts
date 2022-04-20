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
  VariableMedidor,
} from '../models';
import {MedidoresCentroCostoRepository} from '../repositories';

export class MedidoresCentroCostoVariableMedidorController {
  constructor(
    @repository(MedidoresCentroCostoRepository)
    public medidoresCentroCostoRepository: MedidoresCentroCostoRepository,
  ) { }

  @get('/medidores-centro-costos/{id}/variable-medidor', {
    responses: {
      '200': {
        description: 'VariableMedidor belonging to MedidoresCentroCosto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariableMedidor)},
          },
        },
      },
    },
  })
  async getVariableMedidor(
    @param.path.number('id') id: typeof MedidoresCentroCosto.prototype.id,
  ): Promise<VariableMedidor> {
    return this.medidoresCentroCostoRepository.variableMedidor(id);
  }
}
