// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {MedidoresCentroCostoRepository} from '../repositories';

// import {inject} from '@loopback/core';


export class CalculosFacturaController {
  constructor(
    @repository(MedidoresCentroCostoRepository) public repo: MedidoresCentroCostoRepository
  ) { }

  @get('/consumo-medidores')
  async consumoMedidores(
    @param.query.number('cc') cc: number,
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaFactura ${cc},'${f1}','${f2}'`)
  }

  @get('/existenciaRollover')
  async existenciaRollover(
    @param.query.string('descripcion') descripcion: string,
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`
    SELECT
  MAX(ro.fecha) AS fecha,  ro.variableMedidorId, SUM(ro.lecturaAnterior) AS lecturaAnterior, SUM(ro.lecturaNueva) AS lecturaNueva, MAX(CAST(ro.estado as INT)) AS estado, e.descripcion
  FROM
    rollOver ro  JOIN variableMedidor vm
    ON
   ro.variableMedidorId = vm.id  JOIN    medidorEntidad me
    ON
    me.variableMedidorId = ro.variableMedidorId  JOIN entidad e
    ON
    e.id = me.entidadId
  WHERE
    e.descripcion = '${descripcion}'
    AND CAST(ro.fecha AS DATE) BETWEEN '${f1}' AND '${f2}'
    AND ro.estado != 0
  GROUP BY
    ro.variableMedidorId, e.descripcion;

    `)
  }

  @get('/factores-factura')
  async factoresFactura(
    @param.query.number('grupo') grupo: number
  ) {
    return await this.repo.execute(`
    select g.nombre,f.valor from grupos g
    inner join factores f on f.id=g.factorId
	  where g.centroCostoId=${grupo}
    `)
  }

  @get('/generacion')
  async generacionInterna(
    @param.query.boolean('tipo') tipo: boolean,
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaGeneracion ${tipo},'${f1}','${f2}'`)
  }

  @get('/ventaEnee')
  async ventEnee(
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaVentaENEE '${f1}','${f2}'`)
  }
}
