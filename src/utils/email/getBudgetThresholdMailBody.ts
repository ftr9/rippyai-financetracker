interface IBudgetThresholdMessage {
  message: string;
}

export default (data: IBudgetThresholdMessage) => {
  return `<html>
    <head></head>
    <body>
      <p>${data.message}</p>
    </body>
  </html>`;
};
