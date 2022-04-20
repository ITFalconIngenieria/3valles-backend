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
  CentroCosto,
  MedidoresCentroCosto,
} from '../models';
import {CentroCostoRepository} from '../repositories';

export class CentroCostoMedidoresCentroCostoController {
  constructor(
    @repository(CentroCostoRepository) protected centroCostoRepository: CentroCostoRepository,
  ) { }

  @get('/centro-costos/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'Array of CentroCosto has many MedidoresCentroCosto',
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
    return this.centroCostoRepository.medidoresCentroCostos(id).find(filter);
  }

  @post('/centro-costos/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'CentroCosto model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedidoresCentroCosto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CentroCosto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {
            title: 'NewMedidoresCentroCostoInCentroCosto',
            exclude: ['id'],
            optional: ['centroCostoId']
          }),
        },
      },
    }) medidoresCentroCosto: Omit<MedidoresCentroCosto, 'id'>,
  ): Promise<MedidoresCentroCosto> {
    return this.centroCostoRepository.medidoresCentroCostos(id).create(medidoresCentroCosto);
  }

  @patch('/centro-costos/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'CentroCosto.MedidoresCentroCosto PATCH success count',
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
    return this.centroCostoRepository.medidoresCentroCostos(id).patch(medidoresCentroCosto, where);
  }

  @del('/centro-costos/{id}/medidores-centro-costos', {
    responses: {
      '200': {
        description: 'CentroCosto.MedidoresCentroCosto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MedidoresCentroCosto)) where?: Where<MedidoresCentroCosto>,
  ): Promise<Count> {
    return this.centroCostoRepository.medidoresCentroCostos(id).delete(where);
  }
}
