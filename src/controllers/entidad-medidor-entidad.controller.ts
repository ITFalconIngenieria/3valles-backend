import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Entidad,
  MedidorEntidad,
} from '../models';
import {EntidadRepository} from '../repositories';

export class EntidadMedidorEntidadController {
  constructor(
    @repository(EntidadRepository) protected entidadRepository: EntidadRepository,
  ) { }

  @get('/entidads/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Array of Entidad has many MedidorEntidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedidorEntidad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MedidorEntidad>,
  ): Promise<MedidorEntidad[]> {
    return this.entidadRepository.medidorEntidads(id).find(filter);
  }

  @post('/entidads/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Entidad model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedidorEntidad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Entidad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {
            title: 'NewMedidorEntidadInEntidad',
            exclude: ['id'],
            optional: ['entidadId']
          }),
        },
      },
    }) medidorEntidad: Omit<MedidorEntidad, 'id'>,
  ): Promise<MedidorEntidad> {
    return this.entidadRepository.medidorEntidads(id).create(medidorEntidad);
  }

  @patch('/entidads/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Entidad.MedidorEntidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {partial: true}),
        },
      },
    })
    medidorEntidad: Partial<MedidorEntidad>,
    @param.query.object('where', getWhereSchemaFor(MedidorEntidad)) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.entidadRepository.medidorEntidads(id).patch(medidorEntidad, where);
  }

  @del('/entidads/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Entidad.MedidorEntidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedidorEntidad)) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.entidadRepository.medidorEntidads(id).delete(where);
  }
}
