import React from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PickEditor, PickHeater } from "../components/PickEditor";

interface FormFieldValues {
  title: string;
  isPrivate: boolean;
  description?: string;
  urlSlug?: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(255).notRequired(),
  urlSlug: yup
    .string()
    .matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)
    .notRequired(),
  isPrivate: yup.boolean(),
});

const initialFormState: FormFieldValues = {
  title: "",
  description: "",
  urlSlug: "",
  isPrivate: true,
};

interface PickPageProps {}
const PickPage: React.FC<PickPageProps> = () => {
  const methods = useForm<FormFieldValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialFormState,
  });

  return (
    <div className="w-full pt-5">
      <FormProvider {...methods}>
        <PickHeater />
        <PickEditor />
      </FormProvider>
    </div>
  );
};

export default PickPage;
