import { myFetch } from "@/app/utils/myFetch";
import TermsCondition from "@/components/settings/TermsCondition";

export default async function page() {
  const terms = await myFetch("/disclaimer/terms-and-conditions");

  return (
    <>
      <TermsCondition terms={terms?.data} />
    </>
  );
}
