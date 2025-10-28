//helper functions for jsonCheck() in handlers.ts
import {forbiddenWords} from "./forbiddenWords.js";

export function jsonValidDataAnswer(cleanMessage: string) {
 type validData = {
  cleanedBody: string;
  };

  const answerIfValid: validData = {
    cleanedBody: cleanMessage,
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

export function cleanBody(messageBody: string): string {
const splitMessage = messageBody.split(" ");
  let cleanList = [];

  for(const word of splitMessage){
    let cleanCheck = true;
    for(const badWord of forbiddenWords){
      if(word.toLowerCase() == badWord){ 
        cleanCheck = false; //If word is forbidden, cleanliness is false and should push ****
        cleanList.push("****");
      };
    };
    if(cleanCheck == true){ //If it is clean, then true and push the word itself
    cleanList.push(word);
    };
  };

  const cleanedString = cleanList.join(" ");
  return cleanedString;
};