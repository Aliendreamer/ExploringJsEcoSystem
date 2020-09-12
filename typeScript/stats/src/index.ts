import { ConsoleReport } from './analyzers/ConsoleReport';
import { Summary } from './Summary';
import { MatchReader } from './MatchReader';
import { WinAnalysis } from './analyzers/WinAnalysis';
import { HtmlReport } from './analyzers/HtmlReport';

const reader = new MatchReader('football.csv');
reader.read();
const team="Man United";
const summary = new Summary(new WinAnalysis(team),new ConsoleReport());
summary.buildAndPrintReport(reader.data);
