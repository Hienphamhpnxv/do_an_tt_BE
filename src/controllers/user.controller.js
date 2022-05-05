import bcrypt from 'bcryptjs';
import { userService } from '../services/user.serivce';
import { httpStatusCode } from '../utillities/constants';
import { uploadImage } from '../apis/imgBB.api';
import { UserModel } from '../models/user.model';
import { MemberModel } from '../models/member.model';
import { PositionModel } from '../models/position.model';
import auth from '../models/auth';

const Member = auth.member;
const Role = auth.role;
const ROLES = auth.ROLES;

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

const createUser = async (req, res) => {
	try {
		const basicInfo = req.body.basicInfo;
		const memberInfo = req.body.memberInfo;
		const instance = new UserModel({ ...basicInfo, password: bcrypt.hashSync(basicInfo.password, 8) });
		Role.find(
			{
				name: { $in: basicInfo.role },
			},
			(err, roles) => {
				if (err) {
					throw new Error(err);
				}

				instance.roles = roles.map((role) => role._id);

				if (basicInfo.role !== ROLES[0] && Object.keys(memberInfo).length) {
					const member = new Member({ ...memberInfo });
					PositionModel.find(
						{
							standOf: { $in: memberInfo.position },
						},
						(err, valuePositions) => {
							if (err) {
								throw new Error(err);
							}

							member.positions = valuePositions.map((ps) => ps._id);
							member.save((err, valueMember) => {
								if (err) {
									throw new Error(err);
								}
								instance.memberId = valueMember._id;
								instance.save((err, docs) => {
									if (err) {
										throw new Error(err);
									}

									if (docs) {
										res.send({ data: docs._doc });
									}
								});
							});
						}
					);
				} else {
					instance.save((err, docs) => {
						if (err) {
							throw new Error(err);
						}

						if (docs) {
							res.send({ data: docs._doc });
						}
					});
				}
			}
		);
	} catch (err) {
		res.send({ data: false });
	}
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
		await uploadImage(avatar).then(async (result) => {
			await UserModel.findOneAndUpdate(
				{
					_id: id,
				},
				{
					avatar_url: result,
				}
			);
			//validate
			res.status(200).json({ result: result });
		});
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
	}
};

const deleteUserById = async (req, res) => {
	const { id, memberId } = req.body;
	try {
		UserModel.findByIdAndDelete(id, async (err, docs) => {
			if (err) {
				throw new Error(err);
			}
		});

		if (memberId) {
			MemberModel.findByIdAndDelete(memberId, (err, docs) => {
				if (err) {
					throw new Error(err);
				}
			});
		}

		res.status(200).json({ data: true });
	} catch (error) {
		res.status(404).json({
			data: null,
		});
	}
};

const updateUserById = async (req, res) => {
	try {
	} catch (error) {}
};

export const userController = {
	allAccess,
	userBoard,
	adminBoard,
	moderatorBoard,
	createUser,
	updateUser,
	updateAvatar,
	deleteUserById,
};
