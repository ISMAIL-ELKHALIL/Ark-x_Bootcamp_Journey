import Description from "./Description";
import DonationDataForm from "./DonationDataForm";
import PersonalDataForm from "./PersonalDataForm";
import Title from "./Title";
import SubmitButton from "./SubmitButton";
import "./DonationForm.css";
const DonationForm = () => {
  return (
    <main>
      <Title />
      <Description />
      <PersonalDataForm />
      <DonationDataForm />
      <SubmitButton />
    </main>
  );
};

export default DonationForm;
