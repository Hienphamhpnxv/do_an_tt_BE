import { userService } from '../services/user.serivce';
import { httpStatusCode } from '../utillities/constants';
import { uploadImage } from '../apis/imgBB.api';
import { UserModel } from '../models/user.model';

const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

const userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);
    res.status(httpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id, avatar } = req.body;
    await uploadImage(avatar).then(async result => {
      await UserModel.findOneAndUpdate(
        {
          _id: id
        },
        {
          avatar_url: result
        }
      );
      //validate
      res.status(200).json({ result: result });
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
  }
};

export const userController = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  updateUser,
  updateAvatar
};

