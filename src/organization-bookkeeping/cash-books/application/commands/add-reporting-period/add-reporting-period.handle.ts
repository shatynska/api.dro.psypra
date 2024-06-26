import { Inject } from '@nestjs/common';
import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { Result, failure, success } from '~/shared/core/result';
import { ReportingPeriodCreationError } from '../../../domain/errors';
import { CashBookNotFoundError } from '../../errors/cash-book-not-found.error';
import {
  WRITE_REPOSITORY_TOKEN,
  WriteRepository,
} from '../../repositories/write.repository';
import { AddReportingPeriodCommand } from './add-reporting-period.command';

@CommandHandler(AddReportingPeriodCommand)
export class AddReportingPeriodHandler
  implements IQueryHandler<AddReportingPeriodCommand>
{
  constructor(
    @Inject(WRITE_REPOSITORY_TOKEN)
    private writeRepository: WriteRepository,
  ) {}

  async execute(
    command: AddReportingPeriodCommand,
  ): Promise<
    Result<CashBookNotFoundError | ReportingPeriodCreationError, null>
  > {
    const { cashBookId, title, startDate, endDate } = command.params;

    const cashBook = await this.writeRepository.getById(cashBookId);

    if (cashBook === null) {
      // TODO Replace message with constant
      return failure(
        new CashBookNotFoundError(
          'Касова книги з заданим ідентифікатором не знайдена, тому не можливо додати звітній період до неї',
        ),
      );
    }

    const updatedCashBook = cashBook.addReportingPeriod({
      title: title,
      startDate: startDate,
      endDate: endDate,
    });

    if (updatedCashBook.isFailure()) {
      return failure(updatedCashBook.value);
    }

    await this.writeRepository.save(updatedCashBook.value);

    return success(null);
  }
}
