//helper functions for jsonCheck() in handlers.ts

export function jsonValidDataAnswer() {
 type validData = {
  valid: boolean;
  };

  const answerIfValid: validData = {
    valid: true,
  };

  return JSON.stringify(answerIfValid);
};

export function JSONErrorAnswer() {
  type errorJSON = {
    error: string;
  };

  const answerIfError: errorJSON = {
    error: "Something went wrong",
  };

  return JSON.stringify(answerIfError);
};

export function JSONTooLongAnswer() {
  type tooLongJSON = {
    error: string;
  };

  const answerIfTooLong: tooLongJSON = {
    error: "Chirp is too long",
  };

  return JSON.stringify(answerIfTooLong);
};