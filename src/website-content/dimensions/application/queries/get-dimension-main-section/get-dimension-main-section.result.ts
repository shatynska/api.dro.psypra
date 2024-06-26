import { SectionHeaderWithParentLinkDto } from '../../../../page-sections/application/dto/section-header-with-parent-link.dto';
import { SectionDto } from '../../../../page-sections/application/dto/section.dto';
import { DimensionItemsDto } from '../../../application/dto/dimension-items.dto';

export class GetDimensionMainSectionResult extends SectionDto<
  SectionHeaderWithParentLinkDto,
  DimensionItemsDto
> {}
