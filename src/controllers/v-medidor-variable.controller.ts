import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {VMedidorVariable} from '../models';
import {VMedidorVariableRepository} from '../repositories';

export class VMedidorVariableController {
  constructor(
    @repository(VMedidorVariableRepository)
    public vMedidorVariableRepository: VMedidorVariableRepository,
  ) { }

  @get('/v-medidor-variables/count')
  @response(200, {
    description: 'VMedidorVariable model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VMedidorVariable) where?: Where<VMedidorVariable>,
  ): Promise<Count> {
    return this.vMedidorVariableRepository.count(where);
  }

  @get('/v-medidor-variables')
  @response(200, {
    description: 'Array of VMedidorVariable model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VMedidorVariable, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VMedidorVariable) filter?: Filter<VMedidorVariable>,
  ): Promise<VMedidorVariable[]> {
    return this.vMedidorVariableRepository.find(filter);
  }

  @get('/v-medidor-variables/{id}')
  @response(200, {
    description: 'VMedidorVariable model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VMedidorVariable, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VMedidorVariable, {exclude: 'where'}) filter?: FilterExcludingWhere<VMedidorVariable>
  ): Promise<VMedidorVariable> {
    return this.vMedidorVariableRepository.findById(id, filter);
  }
}
