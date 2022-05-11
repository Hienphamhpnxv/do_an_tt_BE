import { Types } from 'mongoose';
import { ClassroomModel } from '../models/classroom.model';

const createClassroomService = async (data) => {
	try {
		const { name, subject, room, code, mentors, description, club } = data;
		const classroom = new ClassroomModel({ name, subject, room, code, mentors: mentors, description, club });
		await classroom.save();
		return classroom;
	} catch (error) {
		throw new Error(error);
	}
};

const getAllClassroomService = async (clubId) => {
	try {
		const classrooms = await ClassroomModel.find({
			club: { $in: clubId },
		})
			.populate('mentors')
			.exec();
		return classrooms;
	} catch (error) {
		throw new Error(error);
	}
};

export const classroomService = { createClassroomService, getAllClassroomService };
