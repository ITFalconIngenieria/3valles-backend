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
  VariableMedidor,
} from '../models';
import {VariableRepository} from '../repositories';

export class VariableVariableMedidorController {
  constructor(
    @repository(VariableRepository) protected variableRepository: VariableRepository,
  ) { }

  @get('/variables/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Array of Variable has many VariableMedidor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariableMedidor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<VariableMedidor>,
  ): Promise<VariableMedidor[]> {
    return this.variableRepository.variableMedidors(id).find(filter);
  }

  @post('/variables/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Variable model instance',
        content: {'application/json': {schema: getModelSchemaRef(VariableMedidor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Variable.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {
            title: 'NewVariableMedidorInVariable',
            exclude: ['id'],
            optional: ['variableId']
          }),
        },
      },
    }) variableMedidor: Omit<VariableMedidor, 'id'>,
  ): Promise<VariableMedidor> {
    return this.variableRepository.variableMedidors(id).create(variableMedidor);
  }

  @patch('/variables/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Variable.VariableMedidor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {partial: true}),
        },
      },
    })
    variableMedidor: Partial<VariableMedidor>,
    @param.query.object('where', getWhereSchemaFor(VariableMedidor)) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.variableRepository.variableMedidors(id).patch(variableMedidor, where);
  }

  @del('/variables/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Variable.VariableMedidor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(VariableMedidor)) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.variableRepository.variableMedidors(id).delete(where);
  }
}
