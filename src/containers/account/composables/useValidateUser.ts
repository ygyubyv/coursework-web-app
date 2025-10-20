import { watch } from "vue";
import { useForm, useFormErrors } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

export const useValidateUser = () => {
  const { t } = useI18n();
  const { user } = storeToRefs(useUserStore());

  const userSchema = yup.object({
    name: yup.string().required(t("forms.validation.required")),
    email: yup
      .string()
      .email(t("forms.validation.invalid", { entity: "email" }))
      .required(t("forms.validation.required")),
    phoneNumber: yup
      .string()
      .nullable()
      .notRequired()
      .matches(/^\+?\d{10,15}$/, {
        message: t("forms.validation.invalid", {
          entity: t("common.phone"),
        }),
        excludeEmptyString: true,
      }),
  });

  const { handleSubmit, resetForm, defineField, meta } = useForm({
    validationSchema: userSchema,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  watch(
    user,
    (val) => {
      if (val) {
        resetForm({
          values: {
            name: val.name,
            email: val.email,
            phoneNumber: val.phoneNumber || "",
          },
        });
      }
    },
    { immediate: true }
  );

  const errors = useFormErrors();

  const [name, nameAttrs] = defineField("name");
  const [email, emailAttrs] = defineField("email");
  const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");

  return {
    meta,
    name,
    nameAttrs,
    email,
    emailAttrs,
    phoneNumber,
    phoneNumberAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
