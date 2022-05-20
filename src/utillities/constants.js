export const httpStatusCode = {
	OK: 200,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	UNAUTHORIZED: 401,
};

export const ROLES_STATUS = [
	{
		name: 'Quản lý',
		standOf: 'QL',
	},
	{
		name: 'Giảng viên',
		standOf: 'GV',
	},
	{
		name: 'Chủ nhiệm',
		standOf: 'CN',
	},
	{
		name: 'Phó chủ nhiệm',
		standOf: 'PCN',
	},
	{
		name: 'Thành viên',
		standOf: 'TV',
	},
	{
		name: 'Cộng tác viên',
		standOf: 'CTV',
	},
];

export const STATUS_ACTIVE_CLASSROOM = {
	PENDING: 0,
	ACTIVE: 1,
	STOP_ACTIVE: 2,
};

export const STATUS_NOTIFICATION_CLASSROOM = {
	PENDING: 0,
	CONFIRMED: 1,
};

export const HAS_CLASSROOM = {
	NO: 0,
	YES: 1,
};

export const STATUS_EXAM = {
	DOING: 0,
	END: 1,
};
