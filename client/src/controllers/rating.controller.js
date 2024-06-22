import responseHandler from "../handlers/response.handler.js";
import ratingModel from "../models/rating.model.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const rating = new ratingModel({
      user: req.user.id,
      movieId,
      ...req.body
    });

    await rating.save();

    responseHandler.created(res, {
      ...rating._doc,
      id: rating.id,
      user: req.user
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const rating = await ratingModel.findOne({
      _id: ratingId,
      user: req.user.id
    });

    if (!rating) return responseHandler.notfound(res);

    await rating.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getRatingOfUser = async (req, res) => {
  try {
    const rating = await ratingModel.find({
      user: req.user.id
    }).sort("-createdAt");

    responseHandler.ok(res, rating);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getRatingOfUser };