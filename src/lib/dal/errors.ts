// define los códigos de error usados por el acceso a datos
export type DataAccessErrorCode = "NETWORK_SIMULATED" | "FETCH_FAILED" | "UNKNOWN";

// define la clase DataAccessError que encapsula código y mensaje
export class DataAccessError extends Error {
  readonly code: DataAccessErrorCode;

  // se inicializó el nombre y el código del error al instanciarse
  constructor(code: DataAccessErrorCode, message: string) {
    super(message);
    this.name = "DataAccessError";
    this.code = code;
  }
}
