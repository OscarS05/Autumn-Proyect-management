const { User, UserSchema } = require('./user.model');
const { List, ListSchema } = require('./list.model');
const { Card, CardSchema } = require('./card.model');

function setupModels(){
  User.init(UserSchema, User.config(sequelize));
  List.init(ListSchema, List.config(sequelize));
  Card.init(CardSchema, List.config(sequelize));

  // User.associate(sequelize.models);
}

module.exports = setupModels;
