"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import signInModalHook from "../../hooks/signInModelHook";
import Heading from "../Heading";
import Modal from "./Modal";
import Input from "../inputs/InputField";
import Button from "../Button";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import LogInModalHook from "@/app/hooks/loginInModelHook";

const SignInModal = () => {
  const signInModal = signInModalHook();
  const loginModal = LogInModalHook();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        signInModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleModal = useCallback(() => {
    signInModal.onClose();
    loginModal.onOpen();
  }, [signInModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => signIn("google")}
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn("github")}
      />

      <div className="text-neutral-500 mt-4 font-light flex justify-center items-center gap-2">
        <div>Already have an account?</div>
        <div
          className="cursor-pointer text-neutral-800 hover:underline"
          onClick={toggleModal}
        >
          Log in
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={signInModal.isOpen}
      title="Sign up"
      actionLabel="Continue"
      onClose={signInModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignInModal;
