export type DataAccessErrorCode = "NETWORK_SIMULATED" | "FETCH_FAILED" | "UNKNOWN";

export class DataAccessError extends Error {
  readonly code: DataAccessErrorCode;

  constructor(code: DataAccessErrorCode, message: string) {
    super(message);
    this.name = "DataAccessError";
    this.code = code;
  }
}
