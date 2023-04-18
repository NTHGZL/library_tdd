import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';

export default (repository) => ({
  statusCheck,
  bookCtrl: bookCtrl(repository.bookRepo)
});
