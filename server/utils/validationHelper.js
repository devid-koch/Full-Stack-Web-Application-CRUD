const validateRequiredFields = (fields) => {
  for (const field in fields) {
    if (!fields[field]) {
      return { isValid: false, message: `${field} is required.` };
    }
  }
  return { isValid: true };
};

module.exports = {
  validateRequiredFields,
};
