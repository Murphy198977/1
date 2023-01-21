// tools.js
// ========
const data = require("./data.json");
module.exports = {
  // function which gets a random item from the data array
  getRandomFeedbackForTagging: function () {
    let randomItem = data[Math.floor(Math.random() * data.length)];
    return randomItem;
  },

  // update an item in the data array with tags
  updateFeedbackWithTags: function (id, tags) {
    // update ./data.json id with tags
    let data = require("./data.json");
    console.log("id:", id);

    let result = data.find(element => element.id === id);
    result.tags.push(tags);

    const fs = require("fs");
    fs.writeFile("./data.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

