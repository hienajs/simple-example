import { DataTypes, SequelizeModel } from 'hienajs'
import * as bcrypt from 'bcrypt-nodejs'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nome: { type: DataTypes.STRING, allowNull: false },
  login: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false }
}

export default function (con) {
  const model = SequelizeModel(con, 'Usuario', fields, {
    tableName: 'usuarios',
    hooks: {
      beforeCreate: (usuario, options) => {
        const salt = bcrypt.genSaltSync()
        usuario.senha = bcrypt.hashSync(usuario.senha, salt)
      },
      beforeUpdate: (usuario, options) => {
        if (usuario.changed('senha')) {
          const salt = bcrypt.genSaltSync()
          usuario.senha = bcrypt.hashSync(usuario.senha, salt)
        }
      }
    }
  })

  model.associate = (models) => {}

  model.prototype.senhaCorreta = function (senha) {
    return bcrypt.compareSync(senha, this.senha)
  }

  model.methods = function (db) {
    model.findByLogin = async function (login, senha) {
      let reg = await model.findActive({
        where: { login },
        attributes: ['id', 'senha']
      })
      if (!reg || !reg.senhaCorreta(senha)) throw new Error('Usuário e/ou senha incorretos!')
      return reg.id
    }
  }

  return model
}
