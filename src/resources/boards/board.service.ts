import boardRepo from './board.memory.repository';

type IBoard = {
  id: string;
  title: string;
  columns: object[];
};

export default {
  getAll: () => boardRepo.getAll(),

  getById: (id: string) => boardRepo.getById(id),

  create: (data: IBoard) => boardRepo.create(data),

  updateById: (id: string, data: object) => boardRepo.updateById(id, data),

  deleteById: (id: string) => boardRepo.deleteById(id),
};
