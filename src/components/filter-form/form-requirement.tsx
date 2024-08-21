"use client";

import { FileInput } from "@/components/filter-form/inputs/file-input";
import { KeywordInput } from "@/components/filter-form/inputs/keyword-input";
import { NameInput } from "@/components/filter-form/inputs/name-input";
import { LengthInput } from "@/components/filter-form/inputs/length-input";
import { FormSubmitButton } from "@/components/filter-form/form-submit-button";
import { DownloadButton } from "@/components/filter-form/download-button";
import { StatusMessages } from "@/components/filter-form/messages/status-message";
import { CalendarInput } from "@/components/filter-form/inputs/calendar-input";
import { DatetimeInput } from "@/components/filter-form/inputs/datetime-input";
import { SpaceInput } from "@/components/filter-form/inputs/space-input";

export const FormRequirement = () => {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-12 px-4 sm:w-[440px]">
      <div className="flex w-full max-w-[440px] flex-col gap-4">
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          Requirements.
        </h1>
        <form className="flex w-full flex-col gap-4">
          <FileInput />
          <KeywordInput />
          <div />
          <NameInput />
          <LengthInput />
          <SpaceInput />
          <CalendarInput />
          <DatetimeInput />
          <FormSubmitButton />
        </form>
        <DownloadButton />
        <StatusMessages />
      </div>
    </div>
  );
};
