import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormInput } from "../../Schema/LoginSchema";
import TextInputComponent from "../../component/form/TextInput";
import PasswordInputComponent from "../../component/form/PasswordInput";
import { PASSWORD, USERNAME } from "../../config/env.ts";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const navigate=useNavigate();

  const onSubmit = (data: LoginFormInput) =>{
    console.log(data);
    console.log(USERNAME);
    console.log(PASSWORD);
    if(data.username===USERNAME && data.password===PASSWORD){
        navigate('/home')
    }
    else{
        alert('Wrong Credentials');

    }
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextInputComponent
              placeholder="Jaydip"
              label="Username"
              error={errors.username?.message}
              {...register("username")}
            />
            <PasswordInputComponent
              label="Password"
              error={errors.password?.message}
              {...register("password")}
            />
            {/* <button type="submit">Submit</button> */}
            <button 
              className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
