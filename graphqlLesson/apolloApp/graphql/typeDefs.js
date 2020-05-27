const { gql } = require('apollo-server');

const typeDefs = gql`
   # we are gonna define the types here

   type Book {
      id:Int
      title:String!
      author:Author
      pages:Int!
   }

   type Poem {
      id:Int
      title:String!
      author:Author
      pages:Int!
   }

   #this can be union or interface there is no major difference 
   # I am just using union this time I can do interface and to make it implimented in
   # both poem and book and it will be same result 
   # it can be seen by their props that interface can be lifted
   union Writings = Poem || Book

   type Author{
      id:Int
      name:String!
      Books:[Book]!
   }

   type Query {
      books:[Books!]!
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
      message: String!
    }
   type Mutation{
      addBook(params: CreateBookInput):MutationResponse
      addAuthor():MutationResponse
      deleteBook():MutationResponse
      deleteAuthor():MutationResponse
   }
`;


export default typeDefs;