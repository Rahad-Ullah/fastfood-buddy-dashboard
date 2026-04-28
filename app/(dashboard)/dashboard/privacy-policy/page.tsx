import { myFetch } from "@/app/utils/myFetch";
import PrivacyPolicy from "@/components/settings/PrivacyPolicy";
import React from "react";

export default async function page() {
  const terms = await myFetch("/disclaimer/privacy-policy");
  return (
    <>
      <PrivacyPolicy terms={terms?.data} />
    </>
  );
}
