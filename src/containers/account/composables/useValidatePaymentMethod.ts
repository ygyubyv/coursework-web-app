import * as yup from "yup";
import { useForm, useFormErrors } from "vee-validate";
import { useI18n } from "vue-i18n";

export const useValidatePaymentMethod = () => {
  const { t } = useI18n();

  const cardSchema = yup.object({
    pan: yup
      .number()
      .required(t("forms.validation.required"))
      .test(
        "len",
        t("forms.validation.length", {
          entity: t("common.card_number"),
          length: 16,
        }),
        (value) => {
          if (!value) {
            return false;
          }

          return value.toString().length === 16;
        }
      ),

    expMonth: yup
      .number()
      .required(t("forms.validation.required"))
      .min(
        1,
        t("forms.validation.invalid", {
          entity: t("common.exp_month"),
        })
      )
      .max(
        12,
        t("forms.validation.invalid", {
          entity: t("common.exp_month"),
        })
      ),

    expYear: yup
      .number()
      .required(t("forms.validation.required"))
      .test(
        "not-expired",
        t("forms.validation.expired", { entity: t("common.exp_year") }),
        (value) => {
          if (!value) {
            return false;
          }

          return value + 2000 >= new Date().getFullYear();
        }
      ),
  });

  const { handleSubmit, resetForm, defineField, meta } = useForm({
    validationSchema: cardSchema,
    initialValues: {
      pan: null,
      expMonth: null,
      expYear: null,
    },
  });

  const errors = useFormErrors();

  const [pan, panAttrs] = defineField("pan");
  const [expMonth, expMonthAttrs] = defineField("expMonth");
  const [expYear, expYearAttrs] = defineField("expYear");

  return {
    meta,
    pan,
    panAttrs,
    expMonth,
    expMonthAttrs,
    expYear,
    expYearAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
