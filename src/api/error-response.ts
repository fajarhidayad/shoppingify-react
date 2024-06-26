export class ErrorResponse extends Error {
  statusCode: number;
  constructor(name: string, message: string, statusCode: number) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
