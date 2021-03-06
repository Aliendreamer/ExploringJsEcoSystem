const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString} = graphql;
const UserType = require('./types/user_type');
const Auth = require('./../services/auth');

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        signup:{
            type:UserType,
            args:{
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            resolve(parentValue,{email,password},req){
                return Auth.signup(email,password,req)
            }
        }
    }
})
module.exports=mutation;