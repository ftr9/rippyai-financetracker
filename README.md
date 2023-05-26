# RIPPY AI - FINANCE TRACKER

### some glimpse (Responsive design Phone + desktop screenshots)

#### Phone

![mob1](https://github.com/ftr9/rippyai-financetracker/assets/60734475/de3df54f-a8ac-4c8c-9406-f833bc3ecb31)
![mob2](https://github.com/ftr9/rippyai-financetracker/assets/60734475/b7af1637-60c1-4070-a9de-c0ed81459d34)
![mob3](https://github.com/ftr9/rippyai-financetracker/assets/60734475/e22faa53-0b99-4ad3-ae65-e658a353d25c)
![mob4](https://github.com/ftr9/rippyai-financetracker/assets/60734475/fa5970ea-86f8-4039-9451-33f20fec5fa2)

#### Desktop

![first](https://github.com/ftr9/rippyai-financetracker/assets/60734475/a33fb173-417f-4b8f-b337-6f296e514cad)
![two](https://github.com/ftr9/rippyai-financetracker/assets/60734475/4021cb9c-362c-4eb9-829e-b0ddac520ef8)
![third](https://github.com/ftr9/rippyai-financetracker/assets/60734475/b0806543-1652-4c90-965f-e1bebaf166e7)

### FEATURES DONE

- [x] User should have a portal
- [x] Users should have the ability to add their income, expense budget, savings and investment data.
- [x] Users should be able to add daily expenses, and that should be deducted from the expense budget.
- [x] Users should be able to visualize what portion of their budget is used.
- [x] Able to view their monthly/ weekly/ daily expenditure list with filters of date and category.
- [x] User should get email notification if their budget is getting really low (Optional)
- [x] User should be able to add email reminder for their loan (Optional)

### FEATURES TODO

- [ ] Able to export reports in desired format. You can give any number of formats like pdf, xlsx, csv. (Optional)

### Others

- [ ] little bit of code clean up and refactoring left

_Deployment_

- Railway App

_Technology stack used_

- Nest JS
- React JS
- Tailwind css
- Prisma orm
- mongodb database
- Typescript (for both frontend + backend)

_Libraries and tools_

- Zustand (for state management)
- SendInBlue api (for sending emails)
- jsonwebtoken (for jwt authentication and authorization)
- @tremor (ui library for building dashboard quickly)
- moment.js (for formatting date and time properly)

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
