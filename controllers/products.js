const productSchema = require("../models/productsSchema");

const getAllProducts = async (req, res) => {
  const data = await productSchema.find(req.query);
  res.status(200).json({ data });
};

const getAllProductsTesting = async (req, res) => {
  const { company, name, feature, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (feature) {
    queryObject.feature = feature;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = productSchema.find(queryObject);

  if (sort) {
    let sortingFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortingFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  // paginations in RestApi
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;

  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  const data = await apiData;
  res.status(200).json({ data });
};

module.exports = { getAllProducts, getAllProductsTesting };
