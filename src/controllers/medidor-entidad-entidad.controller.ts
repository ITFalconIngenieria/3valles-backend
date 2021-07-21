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
  Entidad,
} from '../models';
import {MedidorEntidadRepository} from '../repositories';

export class MedidorEntidadEntidadController {
  constructor(
    @repository(MedidorEntidadRepository)
    public medidorEntidadRepository: MedidorEntidadRepository,
  ) { }

  @get('/medidor-entidads/{id}/entidad', {
    responses: {
      '200': {
        description: 'Entidad belonging to MedidorEntidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entidad)},
          },
        },
      },
    },
  })
  async getEntidad(
    @param.path.number('id') id: typeof MedidorEntidad.prototype.id,
  ): Promise<Entidad> {
    return this.medidorEntidadRepository.entidad(id);
  }
}
