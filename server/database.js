// tools.js
// ========
// const data = require("./data.json");
const mongoose = require("mongoose");

mongoose.connect("mongodb://jake:testtest@mongodb:27017/feedback", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

// Log any errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  tags: [
    [
      {
        type: String,
      },
    ],
  ],
});

const model = mongoose.model("feedback", feedbackSchema);

const initDatabase = async () => {
  console.log("initing the database");
  try {
    const count = await model.estimatedDocumentCount();

    if (count === 0) {
      const feedback = [
        {
          feedback: "This is a test feedback",
          tags: [],
        },
        {
          feedback: "This is another test feedback",
          tags: [],
        },
      ];

      await model.insertMany(feedback);
    }
  } catch (error) {
    console.error(error);
  }
};

const getRandomDocument = async () => {
  initDatabase();
  try {
    const count = await model.estimatedDocumentCount();
    const random = Math.floor(Math.random() * count);
    const randomDocument = await model.findOne().skip(random);
    return randomDocument;
  } catch (error) {
    console.error(error);
  }
};

const updateTags = async (id, tags) => {
  try {
    const updatedDocument = await model.findOneAndUpdate(
      { _id: id },
      { $push: { tags: tags } },
      { new: true }
    );
    return updatedDocument;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  // function which gets a random item from the data array
  getRandomFeedbackForTagging: function () {
    // get a random item from the mongoose db
    return getRandomDocument();

  },

  // update an item in the data array with tags
  updateFeedbackWithTags: function (id, tags) {
    // update ./data.json id with tags
    updateTags(id, tags);
  },
};
