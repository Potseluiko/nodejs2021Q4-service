const taskRepo = require('./task.memory.repository');

const getAllByBoardId = async (boardId) => {
  const tasks = await taskRepo.getAll();

  return tasks.filter((task) => task.boardId === boardId);
};

const getByIdWithBoardId = async (taskId, boardId) => {
  const task = await taskRepo.getById(taskId);

  return task && task.boardId === boardId ? task : null;
};

const create = (data) => taskRepo.create(data);

const updateByIdWithBoardId = async (taskId, boardId, data) => {
  const task = await taskRepo.getById(taskId);

  if (task.boardId === boardId) {
    return taskRepo.updateById(taskId, data);
  } 
    return null;
  
};

const deleteByIdWithBoardId = async (taskId, boardId) => {
  const task = await taskRepo.getById(taskId);

  if (task.boardId === boardId) {
    return taskRepo.deleteById(taskId);
  } 
    return null;
  
};

module.exports = {
  getAllByBoardId,
  getByIdWithBoardId,
  create,
  updateByIdWithBoardId,
  deleteByIdWithBoardId,
};
