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
import moment from 'moment';
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
    let dataConsumo = await this.getDatosMedicion(fechai, fechaf, 0, 2);
    let dataMedidor = dataConsumo.filter((item) => item.id === medidor)[0];
    let generadores = await this.getlistOfMedidores(1, 1)
    let perdidas = generadores.map((item: any) => {return {"label": item.descripcion, "valor": item.quantityId}});
    let grafico: any[] = [];

    grafico.push({"label": moment(fechai).format('YYYY MMM'), "valor": dataMedidor.Consumo})
    for (let x = 0, fecha: string = fechai; x < 6; x++) {
      fecha = moment(fecha).add(-1, 'M').startOf('month').format('YYYY-MM-DD HH:mm')
      let data = await this.getDatosMedicion(fecha, moment(fecha).endOf('month').format('YYYY-MM-DD HH:mm'), 0, 2);
      let d = data.filter((item) => item.id === medidor)[0]
      grafico.push({"label": moment(fecha).format('YYYY MMM'), "valor": d.Consumo});
    }

    return {
      "lecturaInicial": dataMedidor.FI,
      "lecturaFinal": dataMedidor.FF,
      "consumo": dataMedidor.Consumo,
      "perdidas": perdidas.reduce((a: {valor: any;}, b: {valor: any;}) => {return {'valor': a.valor + b.valor}}).valor,
      "total": dataMedidor.Consumo,
      "detallePerdidas": perdidas,
      "consumoHistorico": grafico
    }
  }

  @get('/resumen-datos/')
  async resumenDatos(
    @param.query.string('fechai') fechai: string,
    @param.query.string('fechaf') fechaf: string
  ) {
    let data;
    let dataGeneracion = await this.getDatosMedicion(fechai, fechaf, 1, 1);
    let dataConsumo = await this.getDatosMedicion(fechai, fechaf, 0, 2);

    data = {
      "detalleGeneracion": dataGeneracion,
      "totalGeneracion": dataGeneracion.reduce((a: {Consumo: any;}, b: {Consumo: any;}) => {return {'Consumo': a.Consumo + b.Consumo}}).Consumo,
      "detalleConsumo": dataConsumo,
      "totalConsumo": dataConsumo.reduce((a: {Consumo: any;}, b: {Consumo: any;}) => {return {'Consumo': a.Consumo + b.Consumo}}).Consumo
    };

    return data;
  }


  async getlistOfMedidores(entidad: number, variable: number): Promise<any> {
    return await this.entidadRepository.dataSource.execute(
      `select * from vListadoMedidores where entidad=${entidad} and variableId=${variable}`
    );
  }

  async getDatosMedicion(fechai: string, fechaf: string, entidad: number, variable: number) {
    let dataMedicion: any[] = [];
    let listOfMedidores: any[] = await this.getlistOfMedidores(entidad, variable);
    for (let medidor of listOfMedidores) {
      let dataMedidor: any[] = await this.entidadRepository.dataSource.execute(
        `usp_ObtenerConsumo '${fechai}','${fechaf}',${medidor.id},${medidor.sourceId},${medidor.quantityId}`
      );
      dataMedicion.push({"id": medidor.id, "medidor": medidor.descripcion, "tipoEntidad": medidor.tipoEntidad, "FI": dataMedidor[0].FI, "FF": dataMedidor[0].FF, "Consumo": dataMedidor[0].Consumo * medidor.multiplicador});
    }

    return dataMedicion;
  }

}
