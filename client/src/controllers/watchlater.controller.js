import responseHandler from "../handlers/response.handler.js";
import watchlaterModel from "../models/watchlater.model.js";

const addWatchLater = async (req, res) => {
  try {
    const isWatchLater = await watchlaterModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId
    });

    if (isWatchLater) return responseHandler.ok(res,isWatchLater);

    const watchlater = new watchlaterModel({
      ...req.body,
      user: req.user.id
    });

    await watchlater.save();

    responseHandler.created(res, watchlater);
  } catch {
    responseHandler.error(res);
  }
};

const removeWatchLater = async (req, res) => {
  try {
    const { watchlaterId } = req.params;

    const watchlater = await watchlaterModel.findOne({
      user: req.user.id,
      _id: watchlaterId
    });

    if (!watchlater) return responseHandler.notfound(res);

    await watchlater.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getWatchLaterOfUser = async (req, res) => {
  try {
    const watchlater = await watchlaterModel.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, watchlater);
  } catch {
    responseHandler.error(res);
  }
};

export default { addWatchLater, removeWatchLater, getWatchLaterOfUser };