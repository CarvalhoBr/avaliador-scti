import { Context } from "aws-lambda";
import { Sequelize } from "sequelize-typescript";
import { NextFunction } from "middy";
import getModels from "../models";
import database from "../config/database";

let sequelize: any

export default () => {
  return ({
    before: async (handler: {event: any, context: Context}, next: NextFunction) => {
      const env = process.env.NODE_ENV || 'development';

      // Definindo a opção callbackWaitForEmptyEventLoop para false a lambda não espera que o event loop esteja
      // vazio para encerrar a execução, essa opção é necessária porque o sequelize continua conectado ao banco
      // de dados mesmo depois de encerrar a execução da lambda causando timeout
      handler.context.callbackWaitsForEmptyEventLoop = false;

      if(!sequelize){
        // @ts-ignore
        sequelize = new Sequelize(database)
        sequelize.addModels(getModels())
      }

      return
    }
  })
}