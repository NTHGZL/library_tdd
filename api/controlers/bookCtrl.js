
export default (bookRepo) => {
  const listBooks = (_, res) => {
    res.send({
      data: bookRepo.listBooks()
    });
  };

  const createBook = (req, res) => {
    const data = req.body;
    if (typeof data.isbn13 !== 'number') {
      return res.status(400).send({
        error: {
          message: `L'ISBN est incorrect : 13 chiffres attendus`
        }
      });
    }
    const book = bookRepo.createBook(req.body);
    res.status(201).send({
      data: book
    });
  }

  const updateBook = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (typeof data.isbn13 !== 'number') {
      return res.status(400).send({
        error: {
          message: `L'ISBN est incorrect : 13 chiffres attendus`
        }
      });
    }
    const book = bookRepo.updateBook(id, req.body);

    if (book) {
      return res.send({
        data: book
      });
    }

    res.status(404).send({
      error: `Book ${id} not found`
    });
  }

  const getBook = (req, res) => {
    const id = req.params.id;
    const book = bookRepo.findBook(id);

    if (book) {
      return res.send({
        data: book
      });
    }

    res.status(404).send({
      error: `Book ${id} not found`
    });
  }

  const deleteBook = (req, res) => {
    const id = req.params.id;
    const deletedBook = bookRepo.deleteBook(id);

    if (deletedBook) {
      return res.send({
        meta: {
          _deleted: deletedBook
        }
      });
    }

    res.status(404).send({
      error: `Book ${id} not found`
    });
  }

  return {
    listBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
  };
}
