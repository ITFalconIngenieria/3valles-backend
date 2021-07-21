import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Jerarquia} from '../models';
import {JerarquiaRepository, VJerarquiasRepository} from '../repositories';

export class JerarquiaController {
  constructor(
    @repository(JerarquiaRepository)
    public jerarquiaRepository: JerarquiaRepository,
    @repository(VJerarquiasRepository)
    public vJerarquiasRepository: VJerarquiasRepository,
  ) { }

  @post('/jerarquias')
  @response(200, {
    description: 'Jerarquia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jerarquia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jerarquia, {
            title: 'NewJerarquia',
            exclude: ['id'],
          }),
        },
      },
    })
    jerarquia: Omit<Jerarquia, 'id'>,
  ): Promise<any> {
    let data = await this.jerarquiaRepository.create(jerarquia);

    return await this.vJerarquiasRepository.findById(data.id, {});
  }

  @get('/jerarquias/count')
  @response(200, {
    description: 'Jerarquia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jerarquia) where?: Where<Jerarquia>,
  ): Promise<Count> {
    return this.jerarquiaRepository.count(where);
  }

  @get('/jerarquias')
  @response(200, {
    description: 'Array of Jerarquia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jerarquia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jerarquia) filter?: Filter<Jerarquia>,
  ): Promise<Jerarquia[]> {
    return this.jerarquiaRepository.find(filter);
  }

  @patch('/jerarquias')
  @response(200, {
    description: 'Jerarquia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jerarquia, {partial: true}),
        },
      },
    })
    jerarquia: Jerarquia,
    @param.where(Jerarquia) where?: Where<Jerarquia>,
  ): Promise<Count> {
    return this.jerarquiaRepository.updateAll(jerarquia, where);
  }

  @get('/jerarquias/{id}')
  @response(200, {
    description: 'Jerarquia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jerarquia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jerarquia, {exclude: 'where'}) filter?: FilterExcludingWhere<Jerarquia>
  ): Promise<Jerarquia> {
    return this.jerarquiaRepository.findById(id, filter);
  }

  @patch('/jerarquias/{id}')
  @response(204, {
    description: 'Jerarquia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jerarquia, {partial: true}),
        },
      },
    })
    jerarquia: Jerarquia,
  ): Promise<void> {
    await this.jerarquiaRepository.updateById(id, jerarquia);
  }

  @put('/jerarquias/{id}')
  @response(204, {
    description: 'Jerarquia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jerarquia: Jerarquia,
  ): Promise<any> {
    await this.jerarquiaRepository.replaceById(id, jerarquia);
    return await this.vJerarquiasRepository.findById(id, {});
  }

  @del('/jerarquias/{id}')
  @response(204, {
    description: 'Jerarquia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.jerarquiaRepository.deleteById(id);
  }
}
