const DonationDataForm = () => {
  return (
    <section>
      <h2>
        When we give cheerfully and accept gratefully, everyone is blessed
      </h2>
      <form>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea id="message"></textarea>
      </form>
    </section>
  );
};

export default DonationDataForm;
