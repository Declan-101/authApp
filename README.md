# authApp

Westcliff Passport.js authentication homework using Express, MongoDB, Passport Local Mongoose, and sessions.

## Run locally

1. Install dependencies with `npm ci`.
2. Start local MongoDB at `mongodb://127.0.0.1:27017`.
3. Run `npm start`.
4. Open http://localhost:3001/login.

The database is `MyDatabase` and the collection is `userdetails`. The existing test accounts are user1, user2, and user3. Use their previously assigned passwords; passwords are intentionally excluded from this repository. Startup does not create or change users. A fresh database needs accounts registered separately through `UserDetails.register`.

`PORT` can override port 3001. `SESSION_SECRET` can supply a private session secret; otherwise a random secret is generated for each app start, invalidating old sessions. This homework uses the default in-memory session store for local demonstration.

## Routes

- `/login`: login form; failed authentication displays an error.
- `/`: authenticated homepage.
- `/private`: authenticated private page.
- `/user`: authenticated username only; no hash, salt, or password is returned.
- `/logout`: ends the session and returns to login.

## Verification completed

All three existing accounts successfully logged in and accessed the homepage, private page, and username profile. Incorrect passwords were rejected. Anonymous requests and requests using a logged-out session were redirected to login on every protected route. The three MongoDB users retained salted hashes and had no plaintext password field.

These checks cover the requested authentication features. Compare against the instructor rubric for any additional submission or screenshot requirements.
