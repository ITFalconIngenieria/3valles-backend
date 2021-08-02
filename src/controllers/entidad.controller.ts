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
import {Entidad} from '../models';
import {EntidadRepository} from '../repositories';

export class EntidadController {
  constructor(
    @repository(EntidadRepository)
    public entidadRepository: EntidadRepository,
  ) { }

  @post('/entidads')
  @response(200, {
    description: 'Entidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entidad, {
            title: 'NewEntidad',
            exclude: ['id'],
          }),
        },
      },
    })
    entidad: Omit<Entidad, 'id'>,
  ): Promise<Entidad> {
    return this.entidadRepository.create(entidad);
  }

  @get('/entidads/count')
  @response(200, {
    description: 'Entidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entidad) where?: Where<Entidad>,
  ): Promise<Count> {
    return this.entidadRepository.count(where);
  }

  @get('/entidads')
  @response(200, {
    description: 'Array of Entidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entidad) filter?: Filter<Entidad>,
  ): Promise<Entidad[]> {
    return this.entidadRepository.find(filter);
  }

  @patch('/entidads')
  @response(200, {
    description: 'Entidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entidad, {partial: true}),
        },
      },
    })
    entidad: Entidad,
    @param.where(Entidad) where?: Where<Entidad>,
  ): Promise<Count> {
    return this.entidadRepository.updateAll(entidad, where);
  }

  @get('/entidads/{id}')
  @response(200, {
    description: 'Entidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Entidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Entidad>
  ): Promise<Entidad> {
    return this.entidadRepository.findById(id, filter);
  }

  @patch('/entidads/{id}')
  @response(204, {
    description: 'Entidad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entidad, {partial: true}),
        },
      },
    })
    entidad: Entidad,
  ): Promise<void> {
    await this.entidadRepository.updateById(id, entidad);
  }

  @put('/entidads/{id}')
  @response(204, {
    description: 'Entidad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entidad: Entidad,
  ): Promise<void> {
    await this.entidadRepository.replaceById(id, entidad);
  }

  @del('/entidads/{id}')
  @response(204, {
    description: 'Entidad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entidadRepository.deleteById(id);
  }

  @get('/factura-datos/{medidor}')
  async facturaDatos(
    @param.path.number('medidor') medidor: number,
    @param.query.string('fechai') fechai: string,
    @param.query.string('fechaf') fechaf: string
  ) {
    let data: any[] = [];

    data.push({
      "lecturaInicial": 3589,
      "lecturaFinal": 10458,
      "consumo": 25458,
      "perdidas": 1478,
      "total": 5423,
      "detallePerdidas": [
        {"generador1": 100},
        {"generador2": 100},
        {"generador3": 100},
        {"generador4": 100},
        {"generador5": 100}
      ],
      "consumoHistorico": [
        {"2021-02-01T00:00:00.000Z": 25458},
        {"2021-03-01T00:00:00.000Z": 25458},
        {"2021-04-01T00:00:00.000Z": 25458},
        {"2021-05-01T00:00:00.000Z": 25458},
        {"2021-06-01T00:00:00.000Z": 25458},
        {"2021-07-01T00:00:00.000Z": 25458},
        {"2021-08-01T00:00:00.000Z": 25458}
      ]
    })

    return data
  }
}
