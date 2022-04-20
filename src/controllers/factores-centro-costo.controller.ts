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
  Factores,
  CentroCosto,
} from '../models';
import {FactoresRepository} from '../repositories';

export class FactoresCentroCostoController {
  constructor(
    @repository(FactoresRepository) protected factoresRepository: FactoresRepository,
  ) { }

  @get('/factores/{id}/centro-costos', {
    responses: {
      '200': {
        description: 'Array of Factores has many CentroCosto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CentroCosto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CentroCosto>,
  ): Promise<CentroCosto[]> {
    return this.factoresRepository.centroCostos(id).find(filter);
  }

  @post('/factores/{id}/centro-costos', {
    responses: {
      '200': {
        description: 'Factores model instance',
        content: {'application/json': {schema: getModelSchemaRef(CentroCosto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroCosto, {
            title: 'NewCentroCostoInFactores',
            exclude: ['id'],
            optional: ['factorId']
          }),
        },
      },
    }) centroCosto: Omit<CentroCosto, 'id'>,
  ): Promise<CentroCosto> {
    return this.factoresRepository.centroCostos(id).create(centroCosto);
  }

  @patch('/factores/{id}/centro-costos', {
    responses: {
      '200': {
        description: 'Factores.CentroCosto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroCosto, {partial: true}),
        },
      },
    })
    centroCosto: Partial<CentroCosto>,
    @param.query.object('where', getWhereSchemaFor(CentroCosto)) where?: Where<CentroCosto>,
  ): Promise<Count> {
    return this.factoresRepository.centroCostos(id).patch(centroCosto, where);
  }

  @del('/factores/{id}/centro-costos', {
    responses: {
      '200': {
        description: 'Factores.CentroCosto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CentroCosto)) where?: Where<CentroCosto>,
  ): Promise<Count> {
    return this.factoresRepository.centroCostos(id).delete(where);
  }
}
