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
  Jerarquia,
  MedidorEntidad,
} from '../models';
import {JerarquiaRepository} from '../repositories';

export class JerarquiaMedidorEntidadController {
  constructor(
    @repository(JerarquiaRepository) protected jerarquiaRepository: JerarquiaRepository,
  ) { }

  @get('/jerarquias/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Array of Jerarquia has many MedidorEntidad',
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
    return this.jerarquiaRepository.medidorEntidads(id).find(filter);
  }

  @post('/jerarquias/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Jerarquia model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedidorEntidad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jerarquia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {
            title: 'NewMedidorEntidadInJerarquia',
            exclude: ['id'],
            optional: ['jerarquiaId']
          }),
        },
      },
    }) medidorEntidad: Omit<MedidorEntidad, 'id'>,
  ): Promise<MedidorEntidad> {
    return this.jerarquiaRepository.medidorEntidads(id).create(medidorEntidad);
  }

  @patch('/jerarquias/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Jerarquia.MedidorEntidad PATCH success count',
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
    return this.jerarquiaRepository.medidorEntidads(id).patch(medidorEntidad, where);
  }

  @del('/jerarquias/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Jerarquia.MedidorEntidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedidorEntidad)) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.jerarquiaRepository.medidorEntidads(id).delete(where);
  }
}
