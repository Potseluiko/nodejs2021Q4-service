type IBoard = {
  id: string;
  title: string;
  columns: object[];
};

class BoardModel {
  id: string;
  title: string;
  columns: object[];

  constructor({ id = '', title = '', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = BoardModel;
