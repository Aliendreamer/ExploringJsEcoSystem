import { Sortable, Sorter } from "./Sorter";

export class NumbersCollection extends Sorter implements Sortable {
   data:number[];
   constructor(data:number[]){
      super()
      this.data=data;
   }
   swap(left:number,right:number):void{
      const leftHand = this.data[left];
      this.data[left]=this.data[right];
      this.data[right]=leftHand;
   }
   compare(leftIndex:number,rightIndex:number):boolean{
      return this.data[leftIndex]>this.data[rightIndex];
   }
  get length():number{
      return this.data.length;
   }
}