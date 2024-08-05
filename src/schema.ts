import { z } from "zod";

const formCustomFieldSchema = z.object({
  number: z.number(),
  label: z.string(),
  value: z.string(),
});

const formSchema = z.object({
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

const getCampaignResponsesOptsSchema = z.object({
  status: z.string().optional(),
  firstSubmittedAtStart: z.string().optional(),
  firstSubmittedAtEnd: z.string().optional(),
  lastSubmittedAtStart: z.string().optional(),
  lastSubmittedAtEnd: z.string().optional(),
  completedAtStart: z.string().optional(),
  completedAtEnd: z.string().optional(),
  waitingOnStep: z.string().optional(),
  page: z.number().optional(),
  retrieveAllPages: z.boolean().optional(),
});

const getCampaignResponsesResponseSchema = z.object({
  data: z.array(formSchema),
  meta: z.object({
    pagination: z.object({
      currentPage: z.number(),
      totalPages: z.number(),
    }),
  }),
});

type FormItem = z.infer<typeof formSchema>;
type FormCustomField = z.infer<typeof formCustomFieldSchema>;
type GetCampaignResponsesOptsSchema = z.infer<
  typeof getCampaignResponsesOptsSchema
>;
type GetCampaignResponsesResponseSchema = z.infer<
  typeof getCampaignResponsesResponseSchema
>;

export {
  formCustomFieldSchema,
  formSchema,
  getCampaignResponsesOptsSchema,
  getCampaignResponsesResponseSchema,
  type FormItem,
  type FormCustomField,
  type GetCampaignResponsesOptsSchema,
  type GetCampaignResponsesResponseSchema,
};
