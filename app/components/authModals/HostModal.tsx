"use client";

import HostModalHook from "@/app/hooks/hostModalHook";
import { data } from "autoprefixer";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import InputField from "../inputs/InputField";
import Location from "../inputs/Location";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const LogInModal = () => {
  const hostModal = HostModalHook();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imgSrc = watch("imgSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return goNext();
    }

    setIsLoading(true);

    axios
      .post("api/listings", data)
      .then(() => {
        toast.success("Your home has been added!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        hostModal.onClose();
      })
      .catch(() => {
        toast.error(
          "Error ocurred!" +
            "\n" +
            "Please check your information again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goBack = () => {
    setStep((val) => val - 1);
  };

  const goNext = () => {
    setStep((val) => val + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return "undefined";
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] gap-3 overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryInput
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
              onClick={(category) => {
                setCustomValue("category", category);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help user find you"
        />
        <Location
          onChange={(val) => {
            setCustomValue("location", val);
          }}
          value={location}
        />
        <Map position={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(val) => setCustomValue("roomCount", val)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(val) => setCustomValue("bathroomCount", val)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place look like"
        />
        <ImageUpload
          value={imgSrc}
          onChange={(val) => setCustomValue("imgSrc", val)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Please tell about your place"
        />
        <InputField
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <InputField
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Lastly, set your price"
          subtitle="How much do you charge per night?"
        />
        <InputField
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      actionLabel={actionLabel}
      isOpen={hostModal.isOpen}
      onClose={hostModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : goBack}
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default LogInModal;
