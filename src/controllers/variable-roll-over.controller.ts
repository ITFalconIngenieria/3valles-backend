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
  Variable,
  RollOver,
} from '../models';
import {VariableRepository} from '../repositories';

export class VariableRollOverController {
  constructor(
    @repository(VariableRepository) protected variableRepository: VariableRepository,
  ) { }

  @get('/variables/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Array of Variable has many RollOver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RollOver)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RollOver>,
  ): Promise<RollOver[]> {
    return this.variableRepository.rollOvers(id).find(filter);
  }

  @post('/variables/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Variable model instance',
        content: {'application/json': {schema: getModelSchemaRef(RollOver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Variable.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RollOver, {
            title: 'NewRollOverInVariable',
            exclude: ['id'],
            optional: ['variableId']
          }),
        },
      },
    }) rollOver: Omit<RollOver, 'id'>,
  ): Promise<RollOver> {
    return this.variableRepository.rollOvers(id).create(rollOver);
  }

  @patch('/variables/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Variable.RollOver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RollOver, {partial: true}),
        },
      },
    })
    rollOver: Partial<RollOver>,
    @param.query.object('where', getWhereSchemaFor(RollOver)) where?: Where<RollOver>,
  ): Promise<Count> {
    return this.variableRepository.rollOvers(id).patch(rollOver, where);
  }

  @del('/variables/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Variable.RollOver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RollOver)) where?: Where<RollOver>,
  ): Promise<Count> {
    return this.variableRepository.rollOvers(id).delete(where);
  }
}
