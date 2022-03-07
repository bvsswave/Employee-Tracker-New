// const validate = require('validate');
const validator = require('validator');
const validate = {
  validateString(str) {
    return str !== '' || 'ENTER VALID RESPONSE';
  },
  
  validateSalary(num) {
    if (validator.isDecimal(num)) return true;
    return 'ENTER VALID SALARY';
  },

  isSame(str1, str2) {
    if (str1 === str2) return true;
  }
};
module.exports = validate;
