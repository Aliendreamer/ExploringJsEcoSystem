import { dateStringToDate } from './utils';
import { CsvReader, MatchData } from "./CsvReader";
import { MatchResult } from "./MatchResult";

export class MatchReader extends CsvReader<MatchData>{
   mapRow(row: string[]): MatchData {
      return [
         dateStringToDate(row[0]),
         row[1],
         row[2],
         parseInt(row[3]),
         parseInt(row[4]),
         row[5] as MatchResult,
         row[6]
      ]
   }

}