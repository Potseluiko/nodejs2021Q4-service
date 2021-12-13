import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';

type IUser = {
  id: string;
  name: string;
  login: string;
};

type ITask2 = {
  id: string;
  userId: string;
};

export default {
  getAll: () => usersRepo.getAll(),

  getById: (userId: string) => usersRepo.getById(userId),

  create: (data: IUser) => usersRepo.create(data),

  updateById: (userId: string, data: object) =>
    usersRepo.updateById(userId, data),

  deleteById: async (userId: string) => {
    const tasks = await tasksRepo.getAll();

    await Promise.all(
      tasks
        .filter((task: ITask2) => task.userId === userId)
        .map((task: ITask2) => tasksRepo.updateById(task.id, { userId: null }))
    );

    return usersRepo.deleteById(userId);
  },
};
