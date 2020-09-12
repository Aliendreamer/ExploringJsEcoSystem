import { Analyzer } from './../Summary';
import { MatchResult } from '../MatchResult';
import { MatchData } from '../CsvReader';

export class WinAnalysis implements Analyzer {

   /**
    *
    */
   constructor(public team:string) {}
   run(matches:MatchData[]): string {
      let wins:number=0;
      for (const match of matches) {
         if(match[1] === "Man United" && match[5]===MatchResult.HomeWin)
            wins++;
         if(match[2] ==="Man United" && match[5]==MatchResult.AwayWin)
            wins++;
      }
      return `${this.team} won ${wins}`;
   }
}
