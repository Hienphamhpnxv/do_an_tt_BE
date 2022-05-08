import bcrypt from 'bcryptjs';
import { userService } from '../services/user.serivce';
import { httpStatusCode } from '../utillities/constants';
import { uploadImage } from '../apis/imgBB.api';
import { UserModel } from '../models/user.model';
import { MemberModel } from '../models/member.model';
// import { PositionModel } from '../models/position.model';
import auth from '../models/auth';
import { Types } from 'mongoose';

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

const getAllUsers = async (req, res) => {
	// const clubId = req.body.clubId;
	const clubId = req.params.idClub;
	const data = await UserModel.aggregate([
		{
			$lookup: {
				from: 'members',
				localField: 'memberId',
				foreignField: '_id',
				as: 'memberInfo',
			},
		},
		{
			$lookup: {
				from: 'clubs',
				localField: 'memberInfo.club',
				foreignField: '_id',
				as: 'clubInfo',
			},
		},
		{
			$lookup: {
				from: 'roles',
				localField: 'roles',
				foreignField: '_id',
				as: 'role',
			},
		},
	]);
	let newData = data;
	if (data.length) {
		newData = data.filter((el) => el.clubInfo[0]?._id.equals(Types.ObjectId(clubId)));
	}
	res.send([...newData]);
};

const createUser = async (req, res) => {
	try {
		const basicInfo = req.body.basicInfo;
		const memberInfo = req.body.memberInfo;
		if (!basicInfo.password) {
			basicInfo.password = memberInfo.studentCode;
		}

		const instance = new UserModel({ ...basicInfo, password: bcrypt.hashSync(basicInfo.password, 8) });
		const member = new Member({ ...memberInfo });

		Role.find(
			{
				standOf: { $in: basicInfo.role },
			},
			(err, roles) => {
				if (err) {
					throw new Error(err);
				}

				instance.roles = roles.map((role) => role._id);
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
	} catch (err) {
		res.send({ data: false });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await userService.updateUser(id, req.body.basicInfo);
		const memberId = result.memberId;
		var authorities = [];
		for (let i = 0; i < result.roles.length; i++) {
			authorities.push(result.roles[i].standOf.toUpperCase());
		}
		const resultMember = await MemberModel.findByIdAndUpdate(memberId, req.body.memberInfo, {
			returnOriginal: false,
		});
		res.status(httpStatusCode.OK).json({ result: { ...result._doc, roles: authorities, memberInfo: { ...resultMember._doc } } });
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
	const { id } = req.params;
	console.log(id);
	try {
		UserModel.findByIdAndDelete(id, async (err, docs) => {
			if (err) {
				throw new Error(err);
			}

			if (docs && docs.memberId) {
				MemberModel.findByIdAndDelete(docs.memberId, (err, docs) => {
					if (err) {
						throw new Error(err);
					}
				});
			}
		});

		res.status(200).json({ result: true });
	} catch (error) {
		res.status(404).json({
			result: false,
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
	getAllUsers,
};
