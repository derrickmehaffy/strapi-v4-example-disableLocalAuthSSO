"use strict";

/**
 * `allowedLocalAuth` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.request.body.email) {
      const allowedUser = await strapi.entityService.findMany(
        "api::allowed-user.allowed-user",
        {
          filters: {
            email: ctx.request.body.email,
          },
        }
      );

      if (
        allowedUser.length > 0 &&
        allowedUser[0].email === ctx.request.body.email &&
        allowedUser[0].allowed === true
      ) {
        await next();
      } else {
        ctx.unauthorized(
          "You are not allowed to login via local auth, please use SSO."
        );
      }
    } else {
      ctx.badRequest("Email is required");
    }
  };
};
