const { gql } = require('apollo-server');

const typeDefs = gql`
   # we are gonna define the types here
   union Writings = Poem | Book

   type Book {
      id:Int
      title:String!
      author:Author
      pages:Int
   }

   type Poem {
      isPoem:Boolean
      id:Int
      title:String!
      author:Author
      pages:Int!
   }

   #this can be union or interface there is no major difference 
   # I am just using union this time I can do interface and to make it implemented in
   # both poem and book and it will be same result 
   # it can be seen by their props that interface can be lifted

   type Author{
      id:Int
      name:String!
      writings:[Writings]
   }

   type Query {
      books:[Book!]!
      authors:[Author!]!
      getAuthor:Author
      getAuthorWorks:[Writings]!
   }

   # creating input type underated feature in graphql
   input CreateBookInput {
      title: String!
      author: String!
      pages: Int!
   }
   # creating custom response type
   type MutationResponse {
      success: Boolean!
      message: String
    }
   type Mutation{
      addBook(params: CreateBookInput):MutationResponse
      addAuthor(name:String):Author
      deleteBook(id:Int):MutationResponse
      deleteAuthor(id:Int):MutationResponse
   }
`;


module.exports = typeDefs;