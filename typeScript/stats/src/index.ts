import { MatchReader } from './MatchReader';
import { MatchResult } from './MatchResult';

const reader = new MatchReader('football.csv');
reader.read();

let manUtdWins:number=0;

for (const match of reader.data) {
   if(match[1] === "Man United" && match[5]===MatchResult.HomeWin)
      manUtdWins++;
   if(match[2] ==="Man United" && match[5]==MatchResult.AwayWin)
      manUtdWins++;
}
console.log(manUtdWins)
