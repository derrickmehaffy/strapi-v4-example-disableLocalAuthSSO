"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const adminRoutes = strapi.admin.routes.admin.routes;
    adminRoutes.find((entry, i) => {
      if (entry.method === "POST" && entry.path === "/login") {
        adminRoutes[i].config.middlewares.push("global::allowedLocalAuth");
        return true;
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
