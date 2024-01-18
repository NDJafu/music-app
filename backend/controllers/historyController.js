const History = require("../models/History");
const { checkPermissonToChangeInfo } = require("../utils/checkPermission");

//chuc nang: khi co mot request duoc gui xuong thi tao mot history luu vao bang History
//  thuoc nguoi dung do
//phan quyen: chi nguoi so huu tai khoan moi duoc tao lich su
//dau vao: mot request co chua: trackId(duoc front gui xuong), userId(lay trong back)
//dau ra: tao mot history trong db, neu thanh cong tra ve history do va thong bao thanh cong
//  nguoc lai, thong bao loi
const createHistory = async (req, res) => {
  const { trackId } = req.body;
  const objHistory = {};

  if (!trackId) {
    return res.status(400).json({ message: "The request is invalid" });
  }

  objHistory.trackId = trackId;
  objHistory.usreId = req.user.userId;

  const history = await History.create(objHistory);

  res.status(201).json({ message: "create history successfully", history });
};

const getAllHistoryByUserId = async (req, res) => {
  checkPermissonToChangeInfo(req.user, req.params.userId);

  const allHistory = await History.find({ userId: req.user.userId });

  res.status(200).json({
    message: "Get All History Of A User Successfully",
    count: allHistory.length,
    allHistory,
  });
};
//chuc nang: lay mot lich su cu the cua nguoi dung thong qua id cua lich su do
//phan quyen: chi co nguoi dung so huu lich su do, hoac admin moi co quyen truy xuat lich su nay
//dau vao: historyId
//dau ra: history obj
//lam sao kiem tra nguoi dung truy xuat manh lich su do so huu manh lich su do
//dua vao manh id manh lich su, ta truy xuat manh lich su do, lay userId trong manh lich su
//so sanh voi userId cua nguoi dung hien tai
const getOneHistoryByHistoryId = async (req, res) => {
  const { id: historyId } = req.params;
  const history = await History.findById({ _id: historyId });

  console.log("history", history);
  if (!history) {
    return res.status(400).json({ message: "There is no history" });
  }
  checkPermissonToChangeInfo(req.user, history.userId.toString());

  res.status(200).json({ message: "get history successfully", history });
};
const deleteOneHistoryByHistoryId = async (req, res) => {
  const { id: historyId } = req.params;
  const history = await History.findById({ _id: historyId });
  checkPermissonToChangeInfo(req.user, history.userId.toString());
  await History.findByIdAndDelete({ _id: historyId });

  res.status(200).json({ message: "delete history successfully" });
};
const deleteAllHistoryByUserId = async (req, res) => {
  const history = await History.deleteMany({ userId: req.user.userId });
  if (!history) {
    return res.status(500).status({ message: "Delete failed" });
  }
  res.status(200).json({ message: "Delete all history successfully" });
};

module.exports = {
  createHistory,
  getAllHistoryByUserId,
  getOneHistoryByHistoryId,
  deleteOneHistoryByHistoryId,
  deleteAllHistoryByUserId,
};
