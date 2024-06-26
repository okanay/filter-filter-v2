import { z } from "zod";
import { useAtom } from "jotai/index";
import { dateValuesAtom } from "@/atoms/search-form-atoms";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["log"];

export const fileSchema = z
  .custom<File>()
  .refine((file) => file !== undefined, "Expected file.")
  .refine((file) => {
    return file?.size <= MAX_FILE_SIZE;
  }, `File size should be less than 20MB.`)
  .refine(
    (file) =>
      ACCEPTED_IMAGE_TYPES.includes(file?.name.split(".").at(-1) as string),
    "Only these type are allowed .log"
  );

const dateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

const dateTimeSelectSchema = z.object({
  from: z.object({
    hour: z
      .number()
      .min(0, { message: "Hour should be between 0 and 24." })
      .max(24, { message: "Hour should be between 0 and 24." }),
    minute: z
      .number()
      .min(0, { message: "Minute should be between 0 and 60." })
      .max(60, { message: "Minute should be between 0 and 60." }),
  }),
});

const dateTimeBetweenSchema = z
  .object({
    from: z.object({
      hour: z
        .number()
        .min(0, { message: "Hour should be between 0 and 24." })
        .max(24, { message: "Hour should be between 0 and 24." }),
      minute: z
        .number()
        .min(0, { message: "Minute should be between 0 and 60." })
        .max(60, { message: "Minute should be between 0 and 60." }),
    }),
    to: z.object({
      hour: z
        .number()
        .min(0, { message: "Hour should be between 0 and 24." })
        .max(24, { message: "Hour should be between 0 and 24." }),
      minute: z
        .number()
        .min(0, { message: "Minute should be between 0 and 60." })
        .max(60, { message: "Minute should be between 0 and 60." }),
    }),
  })
  .superRefine((data, ctx) => {
    const { from, to } = data;

    const fromTime = Number(from.hour) * 60 + Number(from.minute);
    const toTime = to.hour * 60 + to.minute;

    if (fromTime > toTime) {
      ctx.addIssue({
        code: "custom",
        message:
          "The start time range cannot be greater than the end time range",
      });
    }
  });

const spaceValuesSchema = z.object({
  line: z
    .number()
    .min(1, { message: "Custom line limit should be a minimum of 1." })
    .max(10, { message: "Custom line limit should not exceed 10." }),
  space: z
    .number()
    .min(1, { message: "Custom space limit should be a minimum of 1." })
    .max(10, { message: "Custom space limit should not exceed 10." }),
});

const keywordsSchema = z.string().min(4, { message: "Please add some keywords." })

export const formValidation = z
  .object({
    file: fileSchema,
    keywords: z.any(),
    nameOption: z.string(),
    customName: z.string(),
    lengthOption: z.string(),
    customLength: z.number(),
    dateOption: z.string(),
    customDate: z.any(),
    customDates: z.any(),
    filterOption: z.string(),
    dateTimeOption: z.string(),
    dateTimeValue: z.any(),
    spaceOption: z.string(),
    spaceValues: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.nameOption === "custom") {
      if (data.customName.length <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please add your custom file name.",
        });
      }
    }
    //
    else if (data.filterOption !== "none") {
      const checkKeywords = keywordsSchema.safeParse(data.keywords);
      if (!checkKeywords.success) {
        ctx.addIssue({
          code: "custom",
          message: "Please add some keywords.",
        });
      }
    }
    //
    else if (data.dateOption === "between-one") {
      const checkDate = dateSchema.safeParse(new Date(data.customDate));
      if (!checkDate.success) {
        ctx.addIssue({
          code: "custom",
          message: "Please select your date.",
        });
      }
    }
    //
    else if (data.dateOption === "between-two") {
      const checkDatesFrom = dateSchema.safeParse(
        new Date(data.customDates?.from)
      );
      const checkDatesTo = dateSchema.safeParse(new Date(data.customDates?.to));

      if (!checkDatesFrom.success || !checkDatesTo.success) {
        ctx.addIssue({
          code: "custom",
          message: "Please select your dates.",
        });
      }
    }
    //
    else if (data.dateTimeOption === "between") {
      const checkDateValues = dateTimeBetweenSchema.safeParse(
        data.dateTimeValue
      );

      if (!checkDateValues.success) {
        ctx.addIssue({
          code: "custom",
          message: checkDateValues.error.errors.at(0)?.message,
        });

        return;
      }
    }
    //
    else if (data.dateTimeOption === "select") {
      const checkDateValues = dateTimeSelectSchema.safeParse(
        data.dateTimeValue
      );

      if (!checkDateValues.success) {
        ctx.addIssue({
          code: "custom",
          message: checkDateValues.error.errors.at(0)?.message,
        });

        return;
      }
    }
    //
    else if (data.spaceOption === "add-space") {
      const valuesValidation = spaceValuesSchema.safeParse(data.spaceValues);

      if (!valuesValidation.success) {
        ctx.addIssue({
          code: "custom",
          message: valuesValidation.error.errors.at(0)?.message,
        });

        return;
      }
    }
    //
    else if (
      data.lengthOption === "first-custom" ||
      data.lengthOption === "last-custom"
    ) {
      if (data.customLength <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please set your custom line length.",
        });
      }
    }
  });
