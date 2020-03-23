const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const TodoType = require('./todo_type');
const Todo = require('../models/todo');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todo.find({});
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Todo.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
