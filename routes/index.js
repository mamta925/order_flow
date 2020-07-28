const authService = require("./../services/auth");
const productService = require("./../services/product");
module.exports = (app, router) => {
  /**
   * To Create a user
   */
  router.post("/user", async (req, res) => {
    try {
      let missingField = req.body.email ? null : "email";
      if (missingField)
        throw {
          message: `${missingField} field is missing from body params`,
          status: 400,
        };
      let { email } = req.body;
      let resp = await authService.addUser({ email });
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  /**
   * To fetch all the users created in DB
   */
  router.get("/users", async (req, res) => {
    try {
      let resp = await authService.getUsers();
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  /**
   * To save inventories in DB
   */
  router.post("/inventory", async (req, res) => {
    try {
      let missingField = req.body.name
        ? req.body.count
          ? null
          : "count"
        : "name";
      if (missingField) {
        if (req.body.count === 0)
          throw {
            message: `count of inventory must be greater than 0`,
            status: 400,
          };
        throw {
          message: `${missingField} field is missing from body params`,
          status: 400,
        };
      }
      let { name, count } = req.body;
      let resp = await productService.addProduct({ name, count });
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  /**
   * To fetch all the inventories in DB
   */
  router.get("/inventory", async (req, res) => {
    try {
      let resp = await productService.getProducts();
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  /**
   * To place an order
   */
  router.post("/order", async (req, res) => {
    try {
      let missingField = req.body.productId
        ? req.body.userId
          ? null
          : "userId"
        : "productId";
      if (missingField)
        throw {
          message: `${missingField} field is missing from body params`,
          status: 400,
        };
      let { productId, userId } = req.body;
      let resp = await productService.placeOrder({ productId, userId });
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  /**
   * To check all the palced orders by the user
   */
  router.get("/order", async (req, res) => {
    try {
      let missingField = req.query.userId ? null : "userId";
      if (missingField)
        throw {
          message: `${missingField} field is missing from query params`,
          status: 400,
        };
      let userId = req.query.userId;
      let resp = await productService.getPlacedOrders({ userId });
      return res.status((resp && resp.status) || 200).send({ resp });
    } catch (e) {
      return res.status(e.status || 400).send({
        message: e.message,
        error: e.error || null,
      });
    }
  });

  return router;
};
