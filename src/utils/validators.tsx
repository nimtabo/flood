// validator
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

// init personalValidator
const personalValidator = (personalDTO:any) => {
  if (!personalDTO.fullName) {
    return "Please enter your fullName";
  }

  if (!personalDTO.phoneNumber) {
    return "Please enter your phone number";
  }

  if (!personalDTO.state) {
    return "Please select the state of flooded area";
  }

  if (!personalDTO.lga) {
    return "Please select the LGA of flooded area";
  }

  if (!personalDTO.town) {
    return "Please select the town of flooded area";
  }
};

// init reportDataValidator
const reportDataValidator = (reportData:any) => {
  // validate
  if (!reportData.reportMessage) {
    return "Please tell us your story";
  }

  if (!reportData.formattedAddress) {
    return "Please enter the address of the flooded area";
  }
};

// init createResponseValidator
const createResponseValidator = (responseData: any) => {
  // validate
  if (!responseData.fullName) {
    return "Please enter your full name";
  }

  if (!responseData.phoneNumber) {
    return "Please enter your phone number";
  }

  if (!isMobilePhone(responseData.phoneNumber, "en-NG")) {
    return "Please enter a valid phone number";
  }

  if (!responseData.formattedAddress) {
    return "Please enter your address";
  }

  if (!responseData.isAffected) {
    return "Please select if you're affected or not";
  }
};

const createRequestValidator = (requestData: any) => {
  if (!requestData.fullName) {
    return "Please enter your full name";
  }

  if (!requestData.phoneNumber) {
    return "Please enter your phone number";
  }

  if (!isMobilePhone(requestData.phoneNumber, "en-NG")) {
    return "Please enter a valid phone number";
  }

  if (!requestData.title) {
    return "Please select your request";
  }

  if (!requestData.state) {
    return "Please select the state of your location";
  }

  if (!requestData.lga) {
    return "Please select the LGA of your location";
  }

  if (!requestData.town) {
    return "Please enter the town of your location";
  }

  if (!requestData.formattedAddress) {
    return "Please enter your location or a popular landmark near you";
  }
};

// init validators
const validators = {
  personalValidator: personalValidator,
  reportDataValidator: reportDataValidator,
  createResponseValidator: createResponseValidator,
  createRequestValidator: createRequestValidator,
};

// export
export default validators;
