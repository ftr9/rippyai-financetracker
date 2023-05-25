# RIPPY AI - FINANCE TRACKER

### some glimpse (Responsive design Phone + desktop screenshots)

#### Phone

![mob1](https://github.com/ftr9/rippyai-financetracker/assets/60734475/67631bc7-b780-476b-a113-76333c2dd627)
![mob2](https://github.com/ftr9/rippyai-financetracker/assets/60734475/f559f920-ff95-4241-95e9-8086598568ed)
![mob3](https://github.com/ftr9/rippyai-financetracker/assets/60734475/46763184-881c-4ed9-972b-48c0af4d4a87)
![mob3](https://github.com/ftr9/rippyai-financetracker/assets/60734475/c4bfcd9d-5e8d-47c2-af23-dfe6abe26e67)
![mob4](https://github.com/ftr9/rippyai-financetracker/assets/60734475/db649472-8471-4ce3-ac75-1318baadc8d1)

#### Desktop

![one](https://github.com/ftr9/rippyai-financetracker/assets/60734475/b250e561-f950-4d23-9819-6f3b2d66c464)
![two](https://github.com/ftr9/rippyai-financetracker/assets/60734475/c8ec60bc-765b-42fe-ab4e-9865be191e4e)
![third](https://github.com/ftr9/rippyai-financetracker/assets/60734475/9ea0bdc6-f147-4a9b-9199-e2db0ac92018)

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
