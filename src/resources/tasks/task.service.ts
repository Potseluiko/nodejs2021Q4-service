import taskRepo from './task.memory.repository';

type ITask = {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
};

const getAllByBoardId = async (boardId: string) => {
  const tasks = await taskRepo.getAll();

  return tasks.filter((task: ITask) => task.boardId === boardId);
};

const getByIdWithBoardId = async (taskId: string, boardId: string) => {
  const task = await taskRepo.getById(taskId);

  return task && task.boardId === boardId ? task : null;
};

const create = (data: ITask) => taskRepo.create(data);

const updateByIdWithBoardId = async (
  taskId: string,
  boardId: string,
  data: object
) => {
  const task = await taskRepo.getById(taskId);

  if (task?.boardId === boardId) {
    return taskRepo.updateById(taskId, data);
  }
  return null;
};

const deleteByIdWithBoardId = async (taskId: string, boardId: string) => {
  const task = await taskRepo.getById(taskId);

  if (task?.boardId === boardId) {
    return taskRepo.deleteById(taskId);
  }
  return null;
};

export default {
  getAllByBoardId,
  getByIdWithBoardId,
  create,
  updateByIdWithBoardId,
  deleteByIdWithBoardId,
};
