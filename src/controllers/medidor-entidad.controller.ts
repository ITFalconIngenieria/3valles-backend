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
import {MedidorEntidad} from '../models';
import {MedidorEntidadRepository} from '../repositories';

export class MedidorEntidadController {
  constructor(
    @repository(MedidorEntidadRepository)
    public medidorEntidadRepository: MedidorEntidadRepository,
  ) { }

  @post('/medidor-entidads')
  @response(200, {
    description: 'MedidorEntidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedidorEntidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {
            title: 'NewMedidorEntidad',
            exclude: ['id'],
          }),
        },
      },
    })
    medidorEntidad: Omit<MedidorEntidad, 'id'>,
  ): Promise<MedidorEntidad> {
    let push = await this.medidorEntidadRepository.create(medidorEntidad);
    return await this.medidorEntidadRepository.findById(push.id, {include: [{relation: 'variableMedidor', scope: {include: [{relation: 'variable'}, {relation: 'medidor'}]}}, {relation: 'jerarquia'}]});
  }

  @get('/medidor-entidads/count')
  @response(200, {
    description: 'MedidorEntidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedidorEntidad) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.medidorEntidadRepository.count(where);
  }

  @get('/medidor-entidads')
  @response(200, {
    description: 'Array of MedidorEntidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedidorEntidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedidorEntidad) filter?: Filter<MedidorEntidad>,
  ): Promise<MedidorEntidad[]> {
    return this.medidorEntidadRepository.find(filter);
  }

  @patch('/medidor-entidads')
  @response(200, {
    description: 'MedidorEntidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {partial: true}),
        },
      },
    })
    medidorEntidad: MedidorEntidad,
    @param.where(MedidorEntidad) where?: Where<MedidorEntidad>,
  ): Promise<Count> {
    return this.medidorEntidadRepository.updateAll(medidorEntidad, where);
  }

  @get('/medidor-entidads/{id}')
  @response(200, {
    description: 'MedidorEntidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedidorEntidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MedidorEntidad, {exclude: 'where'}) filter?: FilterExcludingWhere<MedidorEntidad>
  ): Promise<MedidorEntidad> {
    return this.medidorEntidadRepository.findById(id, filter);
  }

  @patch('/medidor-entidads/{id}')
  @response(204, {
    description: 'MedidorEntidad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidorEntidad, {partial: true}),
        },
      },
    })
    medidorEntidad: MedidorEntidad,
  ): Promise<void> {
    await this.medidorEntidadRepository.updateById(id, medidorEntidad);
  }

  @put('/medidor-entidads/{id}')
  @response(204, {
    description: 'MedidorEntidad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medidorEntidad: MedidorEntidad,
  ): Promise<any> {
    await this.medidorEntidadRepository.replaceById(id, medidorEntidad);
    return await this.medidorEntidadRepository.findById(id, {include: [{relation: 'variableMedidor', scope: {include: [{relation: 'variable'}, {relation: 'medidor'}]}}, {relation: 'jerarquia'}]});
  }

  @del('/medidor-entidads/{id}')
  @response(204, {
    description: 'MedidorEntidad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medidorEntidadRepository.deleteById(id);
  }
}
