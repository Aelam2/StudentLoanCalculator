import { Sequelize } from "../models/models";

const handleSequelizeError = err => {
  let status = null;
  let error = "";
  let result = {
    codeName: "",
    value: ""
  };

  if (err instanceof Sequelize.UniqueConstraintError) {
    status = 409;
    error = err.errors[0].message;
    result = {
      codeName: err.errors[0].path,
      value: err.errors[0].value
    };
  } else if (err instanceof Sequelize.ValidationError) {
    status = 422;
    error = err.errors[0].message;
    result = {
      codeName: err.errors[0].path,
      value: err.errors[0].value
    };
  }
  return { status, error, result };
};

export { handleSequelizeError };
