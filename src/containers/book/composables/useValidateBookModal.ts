import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { useForm, useFormErrors } from "vee-validate";
import { formatToDatetimeLocal, getTimeBoundaries } from "@/utils";

export const useValidateBookModal = () => {
  const { t } = useI18n();
  const { minuteAgo, nextHour } = getTimeBoundaries();

  const bookSchema = yup.object({
    start: yup
      .string()
      .required(t("forms.validation.required"))
      .test("is-after", t("forms.validation.start_not_past"), function (value) {
        if (!value) {
          return false;
        }

        return new Date(value).getTime() > minuteAgo;
      }),

    end: yup
      .string()
      .required(t("forms.validation.required"))
      .test(
        "is-after",
        t("forms.validation.end_after_start"),
        function (value) {
          const { start } = this.parent;

          if (!value || !start) {
            return false;
          }

          return new Date(value).getTime() > new Date(start).getTime();
        }
      ),
  });

  const { defineField, handleSubmit, resetForm, meta } = useForm({
    validationSchema: bookSchema,
    initialValues: {
      start: formatToDatetimeLocal(new Date()),
      end: formatToDatetimeLocal(new Date(nextHour)),
    },
  });

  const errors = useFormErrors();

  const [start, startAttrs] = defineField("start");
  const [end, endAttrs] = defineField("end");

  return {
    meta,
    start,
    startAttrs,
    end,
    endAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
