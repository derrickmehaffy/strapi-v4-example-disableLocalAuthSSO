# Strapi v4 example - Disable local login based on content-type

This is a small example application that shows how you could use a content-type to allow only specific users to login using native username/password login.

The way this works is by having a content-type that stores the email address of users and a boolean toggle to enable/disable login for that user. (instead of storing the email as a string, a relation could be used with only minor tweaking to the code).

You can find the content-type structure here: [Allowed Users](./src/api/allowed-user/content-types/allowed-user/schema.json).

Next a middleware is constructed to check the incoming email address, look up that user in the allowed users content-type and check if the user is allowed to login. If the user is not allowed to login, the middleware will return a 401 Unauthorized response with a custom error message. This error message will be shown on the admin login page.

You can find the middleware code for this here: [global::allowedLocalAuth](./src/middlewares/allowedLocalAuth.js).

Finally, we need to programmatically inject this middleware into the admin `/login` route as a route middleware so it only fires when this specific endpoint is used. This is done during the registration phase of the application.

You can find the logic for this in the index file here: [bootstrap.js](./src/index.js).

![exampleImage](./images/2023-05-11_14%3A29%3A16_Selection.png)
