
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.createBook);
  app.get('/books/:id', controlers.bookCtrl.getBook);
  app.put('/books/:id', controlers.bookCtrl.updateBook);
  app.delete('/books/:id', controlers.bookCtrl.deleteBook);
}
