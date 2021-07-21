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
  VariableMedidor,
  MedidorEntidad,
} from '../models';
import {VariableMedidorRepository} from '../repositories';

export class VariableMedidorMedidorEntidadController {
  constructor(
    @repository(VariableMedidorRepository) protected variableMedidorRepository: VariableMedidorRepository,
  ) { }

  @get('/variable-medidors/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'Array of VariableMedidor has many MedidorEntidad',
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
    return this.variableMedidorRepository.medidorEntidads(id).find(filter);
  }

  @post('/variable-medidors/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'VariableMedidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedidorEntidad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VariableMedidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {
            title: 'NewMedidorEntidadInVariableMedidor',
            exclude: ['id'],
            optional: ['variableMedidorId']
          }),
        },
      },
    }) medidorEntidad: Omit<MedidorEntidad, 'id'>,
  ): Promise<MedidorEntidad> {
    return this.variableMedidorRepository.medidorEntidads(id).create(medidorEntidad);
  }

  @patch('/variable-medidors/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'VariableMedidor.MedidorEntidad PATCH success count',
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
    return this.variableMedidorRepository.medidorEntidads(id).patch(medidorEntidad, where);
  }

  @del('/variable-medidors/{id}/medidor-entidads', {
    responses: {
      '200': {
        description: 'VariableMedidor.MedidorEntidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedidorEntidad)) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.variableMedidorRepository.medidorEntidads(id).delete(where);
  }
}
