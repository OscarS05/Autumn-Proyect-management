const { User, UserSchema } = require('./user.model');
const { List, ListSchema } = require('./list.model');
const { Card, CardSchema } = require('./card.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  List.init(ListSchema, List.config(sequelize));
  Card.init(CardSchema, Card.config(sequelize));

  User.associate(sequelize.models);
  List.associate(sequelize.models);
  Card.associate(sequelize.models);
}

module.exports = setupModels;
