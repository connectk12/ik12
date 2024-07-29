import { z } from 'zod';

const formCustomFieldSchema = z.object({
  number: z.number(),
  label: z.string(),
  value: z.string(),
});

const formItemSchema = z.object({
  formId: z.number(),
  currentResponseLink: z.string(),
  firstSubmittedAt: z.string(),
  lastSubmittedAt: z.string(),
  completedAt: z.string(),
  status: z.string(),
  currentRecipientName: z.string(),
  currentRecipientEmail: z.string(),
  initiatorName: z.string(),
  initiatorEmail: z.string(),
  waitingOnStep: z.string(),
  waitingOnStepLabel: z.string(),
  fields: z.array(formCustomFieldSchema),
});

const responseJsonSchema = z.object({
  data: z.array(formItemSchema),
  meta: z.object({
    pagination: z.object({
      currentPage: z.number(),
      totalPages: z.number(),
    }),
  }),
});

type FormItem = z.infer<typeof formItemSchema>;
type FormCustomField = z.infer<typeof formCustomFieldSchema>;

export {
  formItemSchema,
  responseJsonSchema,
  type FormItem,
  type FormCustomField,
}
