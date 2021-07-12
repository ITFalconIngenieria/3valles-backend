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
  RollOver,
} from '../models';
import {VariableMedidorRepository} from '../repositories';

export class VariableMedidorRollOverController {
  constructor(
    @repository(VariableMedidorRepository) protected variableMedidorRepository: VariableMedidorRepository,
  ) { }

  @get('/variable-medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Array of VariableMedidor has many RollOver',
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
    return this.variableMedidorRepository.rollOvers(id).find(filter);
  }

  @post('/variable-medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'VariableMedidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(RollOver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VariableMedidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RollOver, {
            title: 'NewRollOverInVariableMedidor',
            exclude: ['id'],
            optional: ['variableMedidorId']
          }),
        },
      },
    }) rollOver: Omit<RollOver, 'id'>,
  ): Promise<RollOver> {
    return this.variableMedidorRepository.rollOvers(id).create(rollOver);
  }

  @patch('/variable-medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'VariableMedidor.RollOver PATCH success count',
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
    return this.variableMedidorRepository.rollOvers(id).patch(rollOver, where);
  }

  @del('/variable-medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'VariableMedidor.RollOver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RollOver)) where?: Where<RollOver>,
  ): Promise<Count> {
    return this.variableMedidorRepository.rollOvers(id).delete(where);
  }
}
