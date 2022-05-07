import auth from '../models/auth';
import { ROLES_STATUS } from '../utillities/constants';
const User = auth.user;
const Member = auth.member;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
	const basicInfo = req.body.basicInfo;
	const memberInfo = req.body.memberInfo;
	User.findOne({
		email: basicInfo.email,
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({ message: 'Failed! Email is already in use!' });
			return;
		}

		// check student code
		if (basicInfo.role !== ROLES_STATUS[0].standOf) {
			Member.findOne({
				studentCode: memberInfo.studentCode,
			}).exec((err, member) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				if (member) {
					res.status(400).send({ message: 'Failed! StudentCode is already in use!' });
					return;
				}

				next();
			});
		} else {
			next();
		}
	});
};

const checkRolesExisted = (req, res, next) => {
	const role = req.body.basicInfo.role;
	if (role) {
		const hasRole = ROLES_STATUS.findIndex((el) => el.standOf === role);
		if (hasRole === -1) {
			res.status(400).send({
				message: `Failed! Role ${role} does not exist!`,
			});
			return;
		}
	}

	next();
};

export const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
