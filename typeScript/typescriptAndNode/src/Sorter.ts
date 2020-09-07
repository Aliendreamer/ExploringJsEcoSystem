export interface Sortable{
   swap(left:number,right:number):void
   compare(left:number,right:number):boolean
   length:number
}
export abstract class Sorter {
   sort():void{
      const {length} = this;
      for (let index = 0; index < length; index++) {
         for (let i = 0; index < length-i-1; i++) {
           if(this.compare(i,i+1))
               this.swap(i,i+1);
         }
         
      }
   }
   abstract compare(i:number,j:number):boolean;
   abstract swap(i:number,j:number):void;
   abstract length:number;
}