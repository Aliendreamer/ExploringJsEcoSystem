import { CharactersCollection } from './CharactersCollection';
import { NumbersCollection } from './NumbersCollection';
const charCollection = new CharactersCollection('sortMe');
const collection = new NumbersCollection([2,0,4,5]);
collection.sort();
charCollection.sort()
console.log(collection);
console.log(charCollection)