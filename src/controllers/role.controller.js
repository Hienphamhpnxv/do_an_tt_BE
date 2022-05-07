import { RoleModel } from '../models/role.model';

const getRoles = async (req, res) => {
	const data = await RoleModel.find({});
	res.send([...data]);
};

export const roleController = { getRoles };
