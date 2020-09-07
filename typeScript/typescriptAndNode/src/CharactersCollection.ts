import { Sortable, Sorter } from "./Sorter";

export class CharactersCollection extends Sorter implements Sortable{

   constructor(public data:string){
      super()
   }
   swap(left: number, right: number): void {
     const characters = this.data.split('');
     const leftHand = characters[left];
     characters[left]=characters[right];
     characters[right]=leftHand;
     this.data = characters.join('');
   }
   compare(left: number, right: number): boolean {
      return this.data[left].toLocaleLowerCase()>this.data[right].toLocaleLowerCase();
   }
   get length ():number{
      return this.data.length;
   };

}