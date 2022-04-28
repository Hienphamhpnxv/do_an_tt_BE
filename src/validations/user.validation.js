import { UserModel } from "../models/user.model";
import { httpStatusCode } from "../utillities/constants";

const update = async (req, res, next) => {
  try {
    await UserModel.validateAsync(req.body, {
      abortEarly: true,
      allowUnknown: true,
    });
    next();
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).json({
      message: new Error(error).message,
    });
  }
};

export const userValidation = { update };
