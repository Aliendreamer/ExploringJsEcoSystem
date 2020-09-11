import { MatchResult } from './MatchResult';
import fs from 'fs';
export type MatchData =[Date,string,string,number,number,MatchResult,string];
export  abstract class CsvReader<Т> {
   data: Т[]=[];
   constructor(public filename:string){}
   read():void{
      this.data  = fs.readFileSync(this.filename,{encoding:'utf-8'}).split('\n')
      .map((row:string):string[]=>row.split(','))
      .map(this.mapRow)
   ;}
   abstract mapRow(row:string[]):Т
}