"use client";

import React from "react";
import KeyValuePair from "../KeyValuePair";
import Utils from "@/utils/utils";
import { UserType } from "@/app/context/userContext";

const Form = ({ user }: { user: UserType | null }) => {
  return (
    <form className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
      <div className="mb-4 flex items-start gap-12">
        <KeyValuePair
          labelName="First Name"
          valueName={Utils.capitalizeFirstLetter(user?.first_name || "")}
        />
        <KeyValuePair
          labelName="Last Name"
          valueName={Utils.capitalizeFirstLetter(user?.last_name || "")}
        />
      </div>
      <KeyValuePair
        labelName="Email"
        valueName={user?.email || ""}
        wrapperClassName="mt-4"
      />
    </form>
  );
};

export default Form;
