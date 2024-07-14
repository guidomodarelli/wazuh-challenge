import { z } from 'zod';
import { MIN_DATE_MESSAGE, MUST_BE_GREATER_THAN_OR_EQUAL_TO } from '../../constants';
import moment from 'moment';
import { Priority, Status } from "../../../common/types";

export const schema = z
  .object({
    title: z.string().min(3),
    status: z.enum(Object.values(Status) as [Status]).array(),
    priority: z.enum(Object.values(Priority) as [Priority]).array(),
    plannedDate: z
      .date()
      .min(new Date(), {
        message: MIN_DATE_MESSAGE(new Date()),
      })
      .optional(),
    dueDate: z
      .date()
      .min(new Date(), {
        message: MIN_DATE_MESSAGE(new Date()),
      })
      .optional(),
    startedDate: z
      .date()
      .min(new Date(), {
        message: MIN_DATE_MESSAGE(new Date()),
      })
      .optional(),
    completedDate: z
      .date()
      .min(new Date(), {
        message: MIN_DATE_MESSAGE(new Date()),
      })
      .optional(),
  })
  .refine(
    ({ dueDate, plannedDate }) => {
      if (dueDate && plannedDate) {
        return moment(dueDate).startOf('day') >= moment(plannedDate).startOf('day');
      }
      return true;
    },
    {
      message: MUST_BE_GREATER_THAN_OR_EQUAL_TO('due date', 'planned date'),
      path: ['dueDate'],
    }
  )
  .refine(
    ({ startedDate, completedDate }) => {
      if (startedDate && completedDate) {
        return moment(completedDate).startOf('day') >= moment(startedDate).startOf('day');
      }
      return true;
    },
    {
      message: MUST_BE_GREATER_THAN_OR_EQUAL_TO('completed date', 'started date'),
      path: ['completedDate'],
    }
  );

export type FieldValues = z.infer<typeof schema>;
