import auth from '../models/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/auth';
import { ClubModel } from '../models/club.model';
import { MemberModel } from '../models/member.model';
import { ROLES_STATUS } from '../utillities/constants';

const User = auth.user;
const Member = auth.member;
const Role = auth.role;

const signup = async (req, res) => {
	const basicInfo = req.body.basicInfo;
	const memberInfo = req.body.memberInfo;
	const instance = new User({ ...basicInfo, password: bcrypt.hashSync(basicInfo.password, 8) });
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
				instance.save((err) => {
					if (err) {
						throw new Error(err);
					}

					res.send({ message: 'User was registered successfully!' });
				});
			});
		}
	);
};

const signin = (req, res) => {
	console.log(req.body);
	User.findOne({
		email: req.body.email,
	})
		.populate({ path: 'roles', select: '-__v' })
		.exec(async (err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: 'User Not found.' });
			}

			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				});
			}

			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hours
			});

			const authorities = user.roles;
			MemberModel.findById(user.memberId, async (err, member) => {
				const club = member?.club ? await ClubModel.findById(member.club) : null;
				res.status(200).send({
					...user._doc,
					roles: authorities,
					accessToken: token,
					club,
					memberInfo: member,
				});
			});
		});
};

const getIdDocument = (instance, objectFind) => {
	return new Promise((resolve, reject) => {
		instance.find({ ...objectFind }, async (err, values) => {
			if (err) {
				reject(err);
				return;
			}

			const valueReturn = values.map((value) => value._id) || [];
			resolve(valueReturn);
		});
	});
};

export const authWebController = { signup, signin };
