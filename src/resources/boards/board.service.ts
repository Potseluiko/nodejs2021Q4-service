const boardRepo = require('./board.memory.repository');

module.exports = {
  getAll: () => boardRepo.getAll(),

  getById: (id: string) => boardRepo.getById(id),

  create: (data: object) => boardRepo.create(data),

  updateById: (id: string, data: object) => boardRepo.updateById(id, data),

  deleteById: (id: string) => boardRepo.deleteById(id),
};
