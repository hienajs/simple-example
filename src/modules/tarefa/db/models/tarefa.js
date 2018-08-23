import { DataTypes, SequelizeModel } from 'hienajs'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  descricao: { type: DataTypes.STRING, allowNull: false },
  finalizada: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}

export default function (con) {
  const model = SequelizeModel(con, 'Tarefa', fields, {
    tableName: 'tarefas'
  })

  model.associate = (models) => {
    model.Usuario = model.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' })
  }

  return model
}
