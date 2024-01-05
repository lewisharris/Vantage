"use client";
import React, { ReactElement } from "react";
import { useRegisterMember } from "../../hooks/account";

interface Props {}

export default function CreateClient({}: Props): ReactElement {
  const companyId = "c48c3046-ebb7-4f57-93a0-193d797c33cb";

  const [onRegisterMember, { data, error }] = useRegisterMember({
    onCompleted: (data: any) => console.log(data),
    onError: (error: any) => console.log(error)
  });
  const handleSubmit = () => {
    onRegisterMember({
      variables: {
        input: {
          email: "client12@email.com",
          companyId: companyId,
          first_name: "client",
          last_name: "twelve",
          password: "password"
        }
      }
    });
  };
  return <button onClick={handleSubmit}>Create client</button>;
}
