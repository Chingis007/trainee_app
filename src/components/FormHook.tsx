import { Button, Input } from "@chakra-ui/react"
import React, { useState } from "react"
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control"
import { useForm } from "react-hook-form"
import { fetch_data } from "@/features/issues/issuesSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export interface FormValues {
  url: string
}
const FormHook = () => {
  const schema = yup
    .object({
      url: yup
        .string()
        .matches(
          // /^https:\/\/github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/.*$/,
          /^https:\/\/github\.com\/.*\/.*$/,
          "Valid URL example: https://github.com/exampleUser/exampleRepo",
        )
        .required(),
    })
    .required()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      url: "",
    },
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()
  function onSubmit(values: FormValues) {
    dispatch(fetch_data(values.url))
  }

  return (
    <div>
      <form
        data-testid="form-test"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-center items-start gap-5"
      >
        <FormControl
          isInvalid={errors.url ? true : undefined}
          className="flex flex-1 flex-col"
        >
          <Input
            data-testid="form-input-test"
            id="firstName"
            placeholder="Repo URL: https://github.com/exampleUser/exampleRepo"
            {...register("url", {
              required: "URL is required",
            })}
            bg="#D9D9D9"
            style={{ padding: "0" }}
          />
          <FormErrorMessage className="opacity-50 text-red-600 select-text">
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="teal"
          loading={isSubmitting}
          data-testid="form-button-test"
          type="submit"
        >
          Load issues
        </Button>
      </form>
    </div>
  )
}

export default FormHook
