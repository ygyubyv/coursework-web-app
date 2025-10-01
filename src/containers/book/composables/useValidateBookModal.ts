import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { useForm, useFormErrors } from "vee-validate";
import { formatToYYYYMMDD } from "@/utils/formatToYYYYMMDD";
import { formatToHHmm } from "@/utils/formatToHHmm";
import { getTimeBoundaries } from "@/utils/getTimeBoundaries";

export const useValidateBookModal = () => {
  const { t } = useI18n();
  const { minuteAgo, nextHour } = getTimeBoundaries();

  const bookSchema = yup.object({
    date: yup
      .date()
      .required(t("forms.validation.required"))
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        t("forms.validation.date_not_past")
      ),

    startTime: yup
      .string()
      .required(t("forms.validation.required"))
      .test("is-after", t("forms.validation.start_not_past"), function (value) {
        if (!value) {
          return false;
        }

        return value > formatToHHmm(minuteAgo);
      }),

    endTime: yup
      .string()
      .required(t("forms.validation.required"))
      .test(
        "is-after",
        t("forms.validation.end_after_start"),
        function (value) {
          const { startTime } = this.parent;

          if (!value || !startTime) {
            return false;
          }

          return value > startTime;
        }
      ),
  });

  const { defineField, handleSubmit, resetForm, meta } = useForm({
    validationSchema: bookSchema,
    initialValues: {
      date: formatToYYYYMMDD(Date.now()),
      startTime: formatToHHmm(Date.now()),
      endTime: formatToHHmm(nextHour),
    },
  });

  const errors = useFormErrors();

  const [date, dateAttrs] = defineField("date");
  const [startTime, startTimeAttrs] = defineField("startTime");
  const [endTime, endTimeAttrs] = defineField("endTime");

  return {
    meta,
    date,
    dateAttrs,
    startTime,
    startTimeAttrs,
    endTime,
    endTimeAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
