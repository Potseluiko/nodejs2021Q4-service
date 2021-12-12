type ITask = {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
};

class TaskModel {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;

  constructor({
    id = '',
    title = '',
    description = '',
    order = 0,
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask) {
    const { id, title, description, order, userId, boardId, columnId } = task;
    return { id, title, description, order, userId, boardId, columnId };
  }
}

module.exports = TaskModel;
