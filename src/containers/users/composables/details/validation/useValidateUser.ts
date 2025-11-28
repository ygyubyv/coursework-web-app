import type { BaseSelectOption, Role, UserSummary } from "@/types";
import { useForm, useFormErrors } from "vee-validate";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

interface Props {
  emit: Emits;
}

interface Emits {
  (e: "update:modalIsVisible", val: boolean): void;
  (e: "submit", payload: Partial<UserSummary>): void;
}

export const useValidateUser = ({ emit }: Props) => {
  const { t } = useI18n();

  const schema = yup.object({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
    phoneNumber: yup.string().nullable(),
    roles: yup.array().of(yup.string()).min(1).required(),
  });

  const { handleSubmit, meta, defineField, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      roles: [] as Role[],
    },
  });

  const errors = useFormErrors();

  const [name, nameAttrs] = defineField("name");
  const [email, emailAttrs] = defineField("email");
  const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");
  const [roles, rolesAttrs] = defineField("roles");

  const roleOptions = computed((): BaseSelectOption<Role>[] => {
    return [
      { label: t("roles.admin"), value: "admin" },
      { label: t("roles.user"), value: "user" },
      { label: t("roles.guardian"), value: "guardian" },
      { label: t("roles.owner"), value: "owner" },
    ];
  });

  const setUser = (initialValues: Partial<UserSummary>) => {
    name.value = initialValues.name!;
    email.value = initialValues.email!;
    phoneNumber.value = initialValues.phoneNumber!;
    roles.value = initialValues.roles!;
  };

  const onClose = () => {
    resetForm();
    emit("update:modalIsVisible", false);
  };

  const onSubmit = handleSubmit((values) => {
    emit("submit", values);
  });

  return {
    roleOptions,
    meta,
    name,
    nameAttrs,
    email,
    emailAttrs,
    phoneNumber,
    phoneNumberAttrs,
    roles,
    rolesAttrs,
    errors,
    resetForm,
    setUser,
    onClose,
    onSubmit,
  };
};
