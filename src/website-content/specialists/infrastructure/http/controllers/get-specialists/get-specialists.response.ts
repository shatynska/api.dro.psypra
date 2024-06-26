import { ApiProperty } from '@nestjs/swagger';
import {
  SpecialistEssentialWithAliasAndHrefDto,
  specialistEssentialWithAliasAndHrefDtoStubs,
} from '../../../../application/dto/specialist-essential.dto';
import { GetSpecialistsResult } from '../../../../application/queries/get-specialists/get-specialists.result';

export class GetSpecialistsResponse extends GetSpecialistsResult {
  @ApiProperty({
    example: specialistEssentialWithAliasAndHrefDtoStubs,
  })
  specialists!: SpecialistEssentialWithAliasAndHrefDto[];

  constructor(specialists: GetSpecialistsResult) {
    super();
    Object.assign(this, specialists);
  }
}
