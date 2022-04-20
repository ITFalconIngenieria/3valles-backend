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
  Grupos,
} from '../models';
import {CentroCostoRepository} from '../repositories';

export class CentroCostoGruposController {
  constructor(
    @repository(CentroCostoRepository) protected centroCostoRepository: CentroCostoRepository,
  ) { }

  @get('/centro-costos/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of CentroCosto has many Grupos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Grupos>,
  ): Promise<Grupos[]> {
    return this.centroCostoRepository.grupos(id).find(filter);
  }

  @post('/centro-costos/{id}/grupos', {
    responses: {
      '200': {
        description: 'CentroCosto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CentroCosto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {
            title: 'NewGruposInCentroCosto',
            exclude: ['id'],
            optional: ['centroCostoId']
          }),
        },
      },
    }) grupos: Omit<Grupos, 'id'>,
  ): Promise<Grupos> {
    return this.centroCostoRepository.grupos(id).create(grupos);
  }

  @patch('/centro-costos/{id}/grupos', {
    responses: {
      '200': {
        description: 'CentroCosto.Grupos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {partial: true}),
        },
      },
    })
    grupos: Partial<Grupos>,
    @param.query.object('where', getWhereSchemaFor(Grupos)) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.centroCostoRepository.grupos(id).patch(grupos, where);
  }

  @del('/centro-costos/{id}/grupos', {
    responses: {
      '200': {
        description: 'CentroCosto.Grupos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grupos)) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.centroCostoRepository.grupos(id).delete(where);
  }
}
