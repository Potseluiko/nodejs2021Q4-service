const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (userId) => usersRepo.getById(userId);

const create = (data) => usersRepo.create(data);

const updateById = (userId, data) => usersRepo.updateById(userId, data);

const deleteById = async (userId) => {
  const tasks = await tasksRepo.getAll();

  await Promise.all(
    tasks
      .filter((task) => task.userId === userId)
      .map((task) => tasksRepo.updateById(task.id, { userId: null }))
  );

  return usersRepo.deleteById(userId);
};

module.exports = { getAll, getById, create, updateById, deleteById };
