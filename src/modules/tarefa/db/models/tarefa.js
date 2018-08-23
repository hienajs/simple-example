import { DataTypes, SequelizeModel } from 'hienajs'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  descricao: { type: DataTypes.STRING, allowNull: false },
  finalizada: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  data_finalizada: { type: DataTypes.DATE, allowNull: true }
}

export default function (con) {
  const model = SequelizeModel(con, 'Tarefa', fields, {
    tableName: 'tarefas',
    hooks: {
      beforeUpdate: (tarefa, options) => {
        if (tarefa.changed('finalizada') && tarefa.finalizada === true) {
          tarefa.data_finalizada = new Date()
        }
      }
    }
  })

  model.associate = (models) => {
    model.Usuario = model.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' })
  }

  return model
}
