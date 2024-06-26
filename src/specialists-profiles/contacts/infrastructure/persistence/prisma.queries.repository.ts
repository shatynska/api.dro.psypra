import { Injectable } from '@nestjs/common';
import { PrismaService, SpecialistAliasDto } from '~/shared';
import { ContactsDto, QueriesRepository } from '../../application';
import { GetContactsMapper } from './get-contacts.mapper';

@Injectable()
export class PrismaQueriesRepository implements QueriesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async GetContacts({
    alias,
  }: SpecialistAliasDto): Promise<ContactsDto | null> {
    const data = await this.prismaService.contact.findMany({
      where: {
        specialist: { alias },
      },
      select: {
        id: true,
        value: true,
        type: true,
      },
    });

    return GetContactsMapper.mapToDto(data);
  }
}
