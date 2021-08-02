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
import {VMedidorEntidadVariable} from '../models';
import {VMedidorEntidadVariableRepository} from '../repositories';

export class VMedidorEntidadVariableController {
  constructor(
    @repository(VMedidorEntidadVariableRepository)
    public vMedidorEntidadVariableRepository: VMedidorEntidadVariableRepository,
  ) { }

  @get('/v-medidor-entidad-variables/count')
  @response(200, {
    description: 'VMedidorEntidadVariable model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VMedidorEntidadVariable) where?: Where<VMedidorEntidadVariable>,
  ): Promise<Count> {
    return this.vMedidorEntidadVariableRepository.count(where);
  }

  @get('/v-medidor-entidad-variables')
  @response(200, {
    description: 'Array of VMedidorEntidadVariable model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VMedidorEntidadVariable, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VMedidorEntidadVariable) filter?: Filter<VMedidorEntidadVariable>,
  ): Promise<VMedidorEntidadVariable[]> {
    return this.vMedidorEntidadVariableRepository.find(filter);
  }

  @get('/v-medidor-entidad-variables/{id}')
  @response(200, {
    description: 'VMedidorEntidadVariable model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VMedidorEntidadVariable, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VMedidorEntidadVariable, {exclude: 'where'}) filter?: FilterExcludingWhere<VMedidorEntidadVariable>
  ): Promise<VMedidorEntidadVariable> {
    return this.vMedidorEntidadVariableRepository.findById(id, filter);
  }
}
