//These are classes for commonly found errors

export class BadRequest extends Error {
  constructor(message: string) {
    super(message);
  };
};

export class Unauthorized extends Error {
  constructor(message: string) {
    super(message);
  };
};

export class Forbidden extends Error {
  constructor(message: string) {
    super(message);
  };
};

export class NotFound extends Error {
  constructor(message: string) {
    super(message);
  };
};