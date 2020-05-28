const fs = require("fs");
const path = require("path");
const resolvers = {
   //we are gonna define the resolvers here
   Query: {
      books: () => { 
         const books = fs.readFileSync(path.resolve(__dirname,"../","db","books.json"),'utf8');
         return books.content;
       },
      authors:()=>{
         const authorsJson  = fs.readFileSync(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         return parsedAuthors;
      },
      getAuthor:(obj, {id}, context, info)=>{
          const authorList = fs.readFileSync(path.resolve(__dirname,"../","db","authors.json"),'utf8');
          const parsedAuthors = JSON.parse(authorList).content;
          const author = parsedAuthors.find(x=>x.id===id);  
         return author;
      }
    },
    Mutation:{
      addAuthor:(obj, {name}, context, info)=>{
         const authorList = fs.readFileSync(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorList);
         const newAuthor ={
            name,
            id:parsedAuthors.content.length+1
         }
         parsedAuthors.content.push(newAuthor);
         fs.writeFileSync(path.resolve(__dirname,"../","db","authors.json"),JSON.stringify(parsedAuthors));
         return newAuthor;
     }
    },
    Author:{
      writings(author, args, context,info) {
         const books = fs.readFileSync(path.resolve(__dirname,"../","db","books.json"),'utf8');
         const booksJson = JSON.parse(books).content;
         const authorBooks = booksJson.filter(x=>x.author===author.id);
         const poems = fs.readFileSync(path.resolve(__dirname,"../","db","poems.json"),'utf8');
         const poemsJson = JSON.parse(poems).content;
         const authorPoems = poemsJson.filter(x=>x.author===author.id);
         return [...authorBooks,...authorPoems];
     }
    },
    Writings:{
      __resolveType(obj, context, info){
         if(obj.isPoem){
           return 'Poem';
         }
         return 'Book';
      }
    },
    Book:{
      author(book, args, context,info) {
         const authorsJson  = fs.readFileSync(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         const author = parsedAuthors.filter(a=>a.id === book.author);
         return author;
      }
    },
    Poem:{
      author(book, args, context,info) {
         const authorsJson  = fs.readFileSync(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         const author = parsedAuthors.filter(a=>a.id === book.author);
         return author;
      }
    }
}


module.exports = resolvers;