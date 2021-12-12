const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

type ITask = {
  id: string;
  userId: string;
};

module.exports = {
  getAll: () => usersRepo.getAll(),

  getById: (userId: string) => usersRepo.getById(userId),

  create: (data: object) => usersRepo.create(data),

  updateById: (userId: string, data: object) =>
    usersRepo.updateById(userId, data),

  deleteById: async (userId: string) => {
    const tasks = await tasksRepo.getAll();

    await Promise.all(
      tasks
        .filter((task: ITask) => task.userId === userId)
        .map((task: ITask) => tasksRepo.updateById(task.id, { userId: null }))
    );

    return usersRepo.deleteById(userId);
  },
};
