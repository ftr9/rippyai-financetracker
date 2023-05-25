import axios from 'axios';

interface IMailSentReponse {
  messageId: string;
}

export class EmailService {
  constructor(
    private receiverEmail: string,
    private receiverName: string,
    private emailSubject: string,
    private emailBody: string,
  ) {}

  private readonly defaultAxiosHeader = {
    accept: 'application/json',
    'api-key': process.env.SENDINBLUE_APIKEY,
    'content-type': 'application/json',
  };

  public async sendMail(): Promise<IMailSentReponse> {
    return axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Rippy.AI@rahul',
          email: 'RippyAI.rahuldotel@developer.com',
        },
        to: [
          {
            email: this.receiverEmail,
            name: this.receiverName,
          },
        ],
        subject: this.emailSubject,
        htmlContent: this.emailBody,
      },
      {
        headers: this.defaultAxiosHeader,
      },
    );
  }
}
