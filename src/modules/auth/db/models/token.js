import { DataTypes, SequelizeModel, util } from 'hienajs'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  refresh: { type: DataTypes.STRING, allowNull: false, unique: true },
  expira: { type: DataTypes.DATE, allowNull: false },
  cancel_tipo: { type: DataTypes.STRING, allowNull: true },
  cancel_message: { type: DataTypes.STRING, allowNull: true }
}

export default function (con) {
  const model = SequelizeModel(con, 'Token', fields, {
    tableName: 'tokens'
  })

  model.prototype.cancelaToken = async function (tipo, message) {
    this.active = false
    this.cancel_tipo = tipo
    this.cancel_message = message
    return this.save()
  }

  model.associate = (models) => {
    model.Usuario = model.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' })
  }

  model.methods = function (db) {
    async function findToken (where) {
      const { token, expirada } = await model.validaToken(where)
      if (expirada) {
        await token.cancelaToken('expirado', 'Seu token expirou!')
        return Promise.resolve(null)
      }
      return Promise.resolve(token)
    }

    model.validaToken = async function (where) {
      const token = await this.findActive({ where })
      if (!token) return Promise.resolve({ token, expirada: false })
      if (util.date.stringToTime(token.expira) < util.date.stringToTime()) {
        return Promise.resolve({ token, expirada: true })
      }
      return Promise.resolve({ token, expirada: false })
    }

    model.valida = async function (token) {
      token = await model.findActive({
        where: { token },
        attributes: ['usuario_id']
      })
      if (!token) throw new Error('Acesso Não Permitido!')
      return token
    }

    model.insert = async function (usuario, chave) {
      return model.create({
        usuario_id: usuario,
        token: chave.token,
        expira: chave.expira,
        refresh: chave.refresh
      })
    }

    model.refresh = async function (refresh) {
      const tokenRefresh = await model.findActive({ where: { refresh } })
      if (!tokenRefresh) throw new Error('Refresh token inválido!')
      return tokenRefresh
    }

    model.destroy = async function (token) {
      const getToken = await findToken({ token })
      if (!getToken) return { message: 'Token destruido' }
      await getToken.cancelaToken('destroy', 'Token cancelado')

      return { message: 'Token destruido' }
    }
  }

  return model
}
