"use client"
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  first_name: string;
  email: string;
  organization: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [registerResponse, setRegisterResponse] = useState<string>("")
  const [registerState, setRegisterState] = useState()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        data
      );
      console.log("response in register", response.data);
      // Handle successful registration, navigate to login page
      router.push("/");
    } catch (error) {
      console.error("error in registration", error);
      // Handle registration error
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-b from-yellow-100 to-yellow-400">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center order-1 md:order-1">
        <div>
          <Image
            src="/tyn-login.png"
            alt="tyn-login"
            width={440}
            height={10}
            className="w-full md:max-w-xs md:max-h-xs"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full bg-white p-4 md:p-10 order-2 md:order-2">
        <div className="flex items-start justify-start flex-col gap-4 pt-4 md:pt-20">
          <h2 className="font-bold text-3xl md:text-5xl">Get started</h2>
          <p className="font-light text-base md:text-xl text-gray-400">
            Create your own account with us to get started.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 px-10 justify-center items-center pt-8"
        >
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="first_name">Full Name</label>
            <input
              type="text"
              {...register("first_name", { required: "Name is required" })}
              id="first_name"
              autoComplete="given-name"
              placeholder="Enter your Name"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.first_name && isSubmitted && (
              <p className="text-red-500 capitalize">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="email">Organisation Email</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.email && isSubmitted && (
              <p className="text-red-500 capitalize">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              autoComplete="off"
              id="password"
              placeholder="Enter your password"
              className="text-base placeholder:text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder:text-gray-300 border border-solid w-80"
            />
            {errors.password && (
              <p className="text-red-500 capitalize">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="organization">Organization Name</label>
            <input
              type="text"
              {...register("organization", {
                required: "Organization name is requirerouterd",
              })}
              autoComplete="off"
              id="organization"
              placeholder="Enter your organization"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.organization && isSubmitted && (
              <p className="text-red-500 capitalize">
                {errors.organization.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-500 text-sm px-4 py-2 text-white flex items-center justify-center uppercase font-semibold"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-4 md:mt-10">
          <div>Already have an account?</div>
          <Link href="/" className="underline">
            Sign-in
          </Link>
        </div>
        <div className="border-b border-solid border-gray-300 pr-4 md:pr-40 mt-4 md:mt-6"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
