<div style="text-align: center;">
<h1>National Women's Hall of Fame Nomination Portal</h1>
</div>

## **Team Go Women** - RIT Software Engineering Senior Project 2022-2023
- Celeste Gambardella
- Daniel Kamvakis
- Giovanni Melchionne
- Kelsey Donovan
- May Wu

### Coach
- Samuel Malachowsky

### Sponsor
- National Women's Hall of Fame

<hr />

## Project Description

The Inductee Selection Application is a portal for the National Women's Hall of Fame. The system aims to provide a well-documented, streamlined process for the selection of nominees for induction to the Hall, and to reduce the amount of manual labor required of stakeholders.

This portal will be used by the National Women's Hall of Fame staff, judges, potential judges, and the average user making a nomination. All tasks and forms are collected in one area with user-friendly navigation.

The portal improves on or creates a workflow for the following tasks performed by the National Women's Hall of Fame and its associates:
- Submission of nominations by the general public
- Acceptance of worthy nominations
- Rejection of unworthy nominations
- Merger of identical nominations
- Matching of nominees with judges
- Review of nominees by judges
- Application to be a judge
- Acceptance of worthy judges
- Rejection of unworthy judges
- Statistics gathering

## Development

### Tooling
- Frontend
  - SvelteKit
  - TypeScript
- Backend
  - Azure Function App
  - JavaScript
- Authentication
  - Firebase Auth (e-mail + password)
- Database
  - Azure Database for MySQL (flexible server)
- Hosting
  - Azure Static Web App

### Setup

#### Environment Variables

There are many environment variables required to successfully build and run this application:

- Local `.env` file (`/dashboard/.env`)
  - `DEFAULT_KEY` Azure Cloud Functions key
  - `PUBLIC_FB_API_KEY` Firebase API key
  - `PUBLIC_FB_AUTH_DOMAIN` Firebase auth domain
  - `PUBLIC_FB_PROJECT_ID` Firebase project ID
  - `PUBLIC_FB_STORAGE_BUCKET` Firebase storage bucket
  - `PUBLIC_FB_MESSAGING_SENDER_ID` Firebase messaging sender ID
  - `PUBLIC_FB_APP_ID` Firebase app ID
- Azure Function App Configuration
  - `MYSQL_CONNECTION_PORT` Database connection port
  - `MYSQL_CONNECTION_URL` Database connection URL
  - `MYSQL_DEFAULT_DATABASE` Database name
  - `MYSQL_USER` Database username
  - `MYSQL_USER_PASSWORD` Database password
- Azure Static Web App Configuration
  - `DEFAULTKEY` Azure Cloud Functions key
- GitHub Actions Secrets
  - `PUBLIC_FB_API_KEY` Firebase API key
  - `PUBLIC_FB_AUTH_DOMAIN` Firebase auth domain
  - `PUBLIC_FB_PROJECT_ID` Firebase project ID
  - `PUBLIC_FB_STORAGE_BUCKET` Firebase storage bucket
  - `PUBLIC_FB_MESSAGING_SENDER_ID` Firebase messaging sender ID
  - `PUBLIC_FB_APP_ID` Firebase app ID

Note: local `npm run preview` will not work because the production environment expects the Azure variables rather than the local variables.

#### Frontend (local)

The frontend is located within the `dashboard` directory. Setup is simple:

1. Create the `.env` file according to the instructions above
2. `npm install`
3. `npm run dev`

#### Backend

The backend is hosted on Azure as a function app. The function definitions and source code are in the `azure` directory. 

1. Set up the function app
   1. log into the function app console and navigate to `/site/wwwroot`
   2. Upload the function folders, js files, and package json
   3. Run `npm install` in the console
   4. Functions should show up in the Azure portal
      1. If they don't, you'll have to make them manually. Be sure to set the input parameters and routing information according to the `function.json` files.
   5. Set up the function app configuration according to the instructions above
2. Set up the database
   1. The schema is located at `azure/schema.sql`

#### Frontend (Azure)

1. Create a static web app for SvelteKit
2. In the workflow yaml file, set the following:
   1.  `app_location: "./dashboard"`
   2.  `api_location: "./dashboard/build/server"`
   3.  `output_location: "build/static"`
3.  Also in the workflow yaml file, put the following after `with` and before `close_pull_request_job`:

```yaml
### ...
- name: Build And Deploy
    id: builddeploy
    uses: Azure/static-web-apps-deploy@v1
    with:
        # ...
# ----- INSERT THIS SECTION -----
    env:
        PUBLIC_FB_API_KEY: ${{ secrets.PUBLIC_FB_API_KEY }}
        PUBLIC_FB_AUTH_DOMAIN: ${{ secrets.PUBLIC_FB_AUTH_DOMAIN }}
        PUBLIC_FB_PROJECT_ID: ${{ secrets.PUBLIC_FB_PROJECT_ID }}
        PUBLIC_FB_STORAGE_BUCKET: ${{ secrets.PUBLIC_FB_STORAGE_BUCKET }}
        PUBLIC_FB_MESSAGING_SENDER_ID: ${{ secrets.PUBLIC_FB_MESSAGING_SENDER_ID }}
        PUBLIC_FB_APP_ID: ${{ secrets.PUBLIC_FB_APP_ID }}
# ----- END SECTION -----
```

4. Set the GitHub Actions Secrets according to the instructions above


## License

This project is licensed as detailed in `LICENSE.md`.

<hr />

2022-2023 Team Go Women - Senior Project - Department of Software Engineering, Rochester Institute of Technology, Rochester, NY.