import { Type } from "@angular/core";

export abstract class LogFormatter {
  abstract format(msg: string): string;
}

export abstract class LoggerConfig {

  abstract enableDebug: boolean;
  // abstract logFormatter: new () => LogFormatter;
  abstract logFormatter?: Type<LogFormatter>;

}