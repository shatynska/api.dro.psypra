import { v4 as uuid } from 'uuid';
import { CashBookYear } from './cash-book-year.value-object';
import { CashBook } from './cash-book.aggregate-root';

export class CashBookFactory {
  public static async create(year: CashBookYear) {
    const id = uuid();

    // validate year and throw error if cash book with this year already exists

    return new CashBook(id, year);
  }
}