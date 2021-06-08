import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PickEditor, PickHeater } from "../components/PickEditor";
import { PickModal } from "../components/PickModal";
import { TagModal } from "../components/TagModal";
import { UserModal } from "../components/UserModal";

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
  const [visiblePickModal, setVisiblePickModal] = useState<boolean>(false);
  const [visibleTagModal, setVisibleTagModal] = useState<boolean>(false);
  const [visibleUserModal, setVisibleUserModal] = useState<boolean>(false);

  const methods = useForm<FormFieldValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialFormState,
  });

  const onShowPickModal = useCallback(() => {
    setVisiblePickModal(true);
  }, []);

  const onClosePickModal = useCallback(() => {
    setVisiblePickModal(false);
  }, []);

  const onShowTagModal = useCallback(() => {
    setVisibleTagModal(true);
  }, []);

  const onCloseTagModal = useCallback(() => {
    setVisibleTagModal(false);
  }, []);

  const onShowUserModal = useCallback(() => {
    setVisibleUserModal(true);
  }, []);

  const onCloseUserModal = useCallback(() => {
    setVisibleUserModal(false);
  }, []);

  return (
    <>
      <div className="w-full pt-5">
        <FormProvider {...methods}>
          <PickHeater
            onShowPickModal={onShowPickModal}
            onShowTagModal={onShowTagModal}
            onShowUserModal={onShowUserModal}
          />
          <PickEditor />
        </FormProvider>
      </div>
      <PickModal visible={visiblePickModal} onClose={onClosePickModal} />
      <TagModal visible={visibleTagModal} onClose={onCloseTagModal} />
      <UserModal visible={visibleUserModal} onClose={onCloseUserModal} />
    </>
  );
};

export default PickPage;
