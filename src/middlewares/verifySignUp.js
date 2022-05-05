import auth from '../models/auth';
const ROLES = auth.ROLES;
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
		if (basicInfo.role !== ROLES[0]) {
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
		if (!ROLES.includes(role)) {
			res.status(400).send({
				message: `Failed! Role ${role} does not exist!`,
			});
			return;
		}
	}

	next();
};

export const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
