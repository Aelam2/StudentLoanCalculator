import { Sequelize } from "../models/models";

const handleSequelizeError = err => {
  let status = null;
  let error = "";
  let codeName = "";
  let value = "";

  if (err instanceof Sequelize.UniqueConstraintError) {
    status = 409;
    error = err.errors[0].message;
    codeName = err.errors[0].path;
    value = err.errors[0].value;
  } else if (err instanceof Sequelize.ValidationError) {
    status = 422;
    error = err.errors[0].message;
    codeName = err.errors[0].path;
    value = err.errors[0].value;
  }
  return { status, error, codeName, value };
};

export { handleSequelizeError };
