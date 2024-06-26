import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { contactsDtoSchema } from '../../../application';

const addEmailRequestBodySchema = z.object({
  contact: contactsDtoSchema.shape.emails.element.shape.value,
});

export class AddEmailRequestBody extends createZodDto(
  addEmailRequestBodySchema,
) {}
