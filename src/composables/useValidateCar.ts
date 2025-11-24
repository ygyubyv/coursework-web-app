import * as yup from "yup";
import { useForm, useFormErrors } from "vee-validate";
import { useI18n } from "vue-i18n";
import type { Car } from "@/types";
import { watch, type Ref } from "vue";

export const useValidateCar = (initialCar?: Ref<Car>) => {
  const { t } = useI18n();

  const carSchema = yup.object({
    number: yup
      .string()
      .required(t("forms.validation.required", { entity: t("common.number") }))
      .matches(
        /^[A-Z0-9-]{4,10}$/i,
        t("forms.validation.invalid", { entity: t("common.number") })
      ),

    brand: yup
      .string()
      .required(t("forms.validation.required", { entity: t("common.brand") }))
      .min(
        2,
        t("forms.validation.minLength", { entity: t("common.brand"), min: 2 })
      ),

    model: yup
      .string()
      .required(t("forms.validation.required", { entity: t("common.model") }))
      .min(
        2,
        t("forms.validation.minLength", { entity: t("common.model"), min: 2 })
      ),

    color: yup
      .string()
      .required(t("forms.validation.required", { entity: t("common.color") }))
      .min(
        2,
        t("forms.validation.minLength", { entity: t("common.color"), min: 2 })
      ),
  });

  const { handleSubmit, resetForm, defineField, meta } = useForm({
    validationSchema: carSchema,
    initialValues: {
      number: initialCar?.value.number || "",
      brand: initialCar?.value.brand || "",
      model: initialCar?.value.model || "",
      color: initialCar?.value.color || "",
    },
  });

  const errors = useFormErrors();

  const [number, numberAttrs] = defineField("number");
  const [brand, brandAttrs] = defineField("brand");
  const [model, modelAttrs] = defineField("model");
  const [color, colorAttrs] = defineField("color");

  watch(
    () => initialCar?.value,
    (newVal) => {
      if (!newVal) {
        return;
      }

      resetForm({
        values: {
          number: newVal.number,
          brand: newVal.brand,
          model: newVal.model,
          color: newVal.color,
        },
      });
    },
    { immediate: true, deep: true }
  );

  return {
    meta,
    number,
    numberAttrs,
    brand,
    brandAttrs,
    model,
    modelAttrs,
    color,
    colorAttrs,
    errors,
    handleSubmit,
    resetForm,
  };
};
