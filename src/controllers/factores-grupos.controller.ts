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
  Grupos,
} from '../models';
import {FactoresRepository} from '../repositories';

export class FactoresGruposController {
  constructor(
    @repository(FactoresRepository) protected factoresRepository: FactoresRepository,
  ) { }

  @get('/factores/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Factores has many Grupos',
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
    return this.factoresRepository.grupos(id).find(filter);
  }

  @post('/factores/{id}/grupos', {
    responses: {
      '200': {
        description: 'Factores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {
            title: 'NewGruposInFactores',
            exclude: ['id'],
            optional: ['factorId']
          }),
        },
      },
    }) grupos: Omit<Grupos, 'id'>,
  ): Promise<Grupos> {
    return this.factoresRepository.grupos(id).create(grupos);
  }

  @patch('/factores/{id}/grupos', {
    responses: {
      '200': {
        description: 'Factores.Grupos PATCH success count',
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
    return this.factoresRepository.grupos(id).patch(grupos, where);
  }

  @del('/factores/{id}/grupos', {
    responses: {
      '200': {
        description: 'Factores.Grupos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Grupos)) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.factoresRepository.grupos(id).delete(where);
  }
}
