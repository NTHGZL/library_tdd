import bookRepo from './bookRepo.js';

export default (model) => ({
  bookRepo: bookRepo(model.Book)
});
