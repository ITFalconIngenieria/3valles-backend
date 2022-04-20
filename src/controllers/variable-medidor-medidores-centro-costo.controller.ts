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
  MedidoresCentroCosto,
} from '../models';
import {VariableMedidorRepository} from '../repositories';

export class VariableMedidorMedidoresCentroCostoController {
  constructor(
    @repository(VariableMedidorRepository) protected variableMedidorRepository: VariableMedidorRepository,
  ) { }

  @get('/variable-medidors/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'Array of VariableMedidor has many MedidoresCentroCosto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedidoresCentroCosto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MedidoresCentroCosto>,
  ): Promise<MedidoresCentroCosto[]> {
    return this.variableMedidorRepository.medidoresCentroCostos(id).find(filter);
  }

  @post('/variable-medidors/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'VariableMedidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedidoresCentroCosto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VariableMedidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {
            title: 'NewMedidoresCentroCostoInVariableMedidor',
            exclude: ['id'],
            optional: ['variableMedidorId']
          }),
        },
      },
    }) medidoresCentroCosto: Omit<MedidoresCentroCosto, 'id'>,
  ): Promise<MedidoresCentroCosto> {
    return this.variableMedidorRepository.medidoresCentroCostos(id).create(medidoresCentroCosto);
  }

  @patch('/variable-medidors/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'VariableMedidor.MedidoresCentroCosto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {partial: true}),
        },
      },
    })
    medidoresCentroCosto: Partial<MedidoresCentroCosto>,
    @param.query.object('where', getWhereSchemaFor(MedidoresCentroCosto)) where?: Where<MedidoresCentroCosto>,
  ): Promise<Count> {
    return this.variableMedidorRepository.medidoresCentroCostos(id).patch(medidoresCentroCosto, where);
  }

  @del('/variable-medidors/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'VariableMedidor.MedidoresCentroCosto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedidoresCentroCosto)) where?: Where<MedidoresCentroCosto>,
  ): Promise<Count> {
    return this.variableMedidorRepository.medidoresCentroCostos(id).delete(where);
  }
}
