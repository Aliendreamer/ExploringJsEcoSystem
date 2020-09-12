import { Analyzer } from './Summary';
import { MatchData } from './CsvReader';

export interface Analyzer {
   run(matches:MatchData[]):string
}
export interface OutputTarget {
   print(report:string):void
}

export class Summary {

   constructor(public analyzer:Analyzer,public outputTarget:OutputTarget){}

   buildAndPrintReport(matches:MatchData[]):void{
      const report = this.analyzer.run(matches);
      this.outputTarget.print(report);
   }
}