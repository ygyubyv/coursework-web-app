import * as yup from "yup";
import { useForm, useFormErrors } from "vee-validate";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

export const useValidateUser = () => {
  const { t } = useI18n();
  const { user } = storeToRefs(useAuthStore());

  const userSchema = yup.object({
    fullName: yup.string().required(t("forms.validation.required")),

    email: yup
      .string()
      .email(t("forms.validation.invalid", { entity: "email" }))
      .required(t("forms.validation.required")),

    phoneNumber: yup
      .string()
      .required(t("forms.validation.required", { entity: t("common.phone") }))
      .matches(
        /^\+?\d{10,15}$/,
        t("forms.validation.invalid", { entity: t("common.phone") })
      ),
  });

  const { handleSubmit, resetForm, defineField, meta } = useForm({
    validationSchema: userSchema,
    initialValues: {
      fullName: user.value!.name,
      email: user.value!.email,
      phoneNumber: user.value!.phoneNumber,
    },
  });

  const errors = useFormErrors();

  const [fullName, fullNameAttrs] = defineField("fullName");
  const [email, emailAttrs] = defineField("email");
  const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");

  return {
    meta,
    fullName,
    fullNameAttrs,
    email,
    emailAttrs,
    phoneNumber,
    phoneNumberAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
