const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    description = '',
    order = 0,
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, description, order, userId, boardId, columnId } = task;
    return { id, title, description, order, userId, boardId, columnId };
  }
}

module.exports = Task;
