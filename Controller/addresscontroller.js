var Address = require("../Model/addressmodel");

// CREATE //
var CreateAddress = async function (req, res, next) {
  try {
    const { addressLine1, addressLine2, city, pincode } = req.body;
    const UserId = req.headers.userId;

    const address = await Address.find({ UserId });
    const Create = await Address.create({
      UserId,
      addressLine1,
      addressLine2,
      city,
      pincode,
      setAsDefault: address.length === 0,
    });

    res.status(200).json({
      status: "Address Create",
      message: "Address Create Successful",
      Data: Create,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var DefaultAddressSet = async function (req, res, next) {
  try {
    const id = req.body.id;
    const findid = await Address.findById(id);
    const findone = await Address.findOne({ setAsDefault: true });

    if (findone.setAsDefault === true) {
      findone.setAsDefault = false;
      await findone.save();
    }
    if (findid.setAsDefault === false) {
      findid.setAsDefault = true;
      await findid.save();
    }

    res.status(200).json({
      status: "Address Set",
      message: "Address Set Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  CreateAddress,
  DefaultAddressSet,
};
