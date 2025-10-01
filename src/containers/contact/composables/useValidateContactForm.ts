import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { useForm, useFormErrors } from "vee-validate";

export const useValidateContactForm = () => {
  const { t } = useI18n();

  const contactSchema = yup.object({
    fullName: yup.string().required(t("forms.validation.required")),

    email: yup
      .string()
      .email(t("forms.validation.invalid", { entity: "email" }))
      .required(t("forms.validation.required")),

    message: yup
      .string()
      .required(t("forms.validation.required"))
      .min(
        10,
        t("forms.validation.minLength", {
          entity: t("common.message"),
          min: 10,
        })
      )
      .max(
        200,
        t("forms.validation.maxLength", {
          entity: t("common.message"),
          max: 200,
        })
      ),
  });

  const { defineField, handleSubmit, resetForm, meta } = useForm({
    validationSchema: contactSchema,
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const errors = useFormErrors();

  const [fullName, fullNameAttrs] = defineField("fullName");
  const [email, emailAttrs] = defineField("email");
  const [message, messageAttrs] = defineField("message");

  return {
    meta,
    errors,
    fullName,
    fullNameAttrs,
    email,
    emailAttrs,
    message,
    messageAttrs,
    handleSubmit,
    resetForm,
  };
};
