// se definieron los códigos de error usados por el acceso a datos
export type DataAccessErrorCode = "NETWORK_SIMULATED" | "FETCH_FAILED" | "UNKNOWN";

// se definió la clase DataAccessError que encapsuló código y mensaje
export class DataAccessError extends Error {
  readonly code: DataAccessErrorCode;

  // se inicializó el nombre y el código del error al instanciarse
  constructor(code: DataAccessErrorCode, message: string) {
    super(message);
    this.name = "DataAccessError";
    this.code = code;
  }
}
