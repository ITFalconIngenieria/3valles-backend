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
  Jerarquia,
} from '../models';
import {MedidorEntidadRepository} from '../repositories';

export class MedidorEntidadJerarquiaController {
  constructor(
    @repository(MedidorEntidadRepository)
    public medidorEntidadRepository: MedidorEntidadRepository,
  ) { }

  @get('/medidor-entidads/{id}/jerarquia', {
    responses: {
      '200': {
        description: 'Jerarquia belonging to MedidorEntidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jerarquia)},
          },
        },
      },
    },
  })
  async getJerarquia(
    @param.path.number('id') id: typeof MedidorEntidad.prototype.id,
  ): Promise<Jerarquia> {
    return this.medidorEntidadRepository.jerarquia(id);
  }
}
