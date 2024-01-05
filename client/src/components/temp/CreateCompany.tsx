import React, { ReactElement } from "react";
import { useCreateCompany } from "../../hooks/account";

interface Props {}

export default function CreateCompany({}: Props): ReactElement {
  const [onCreateCompany, { data, error }] = useCreateCompany({
    onCompleted: (data: any) => {
      console.log(data);
    }
  });

  const handleClick = () => {
    onCreateCompany({ variables: { input: { name: "mycompany" } } });
  };
  return <button onClick={handleClick}>Create Company</button>;
}
