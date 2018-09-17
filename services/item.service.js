const Anti = require('../spiders/anti');
const Item = require('../spiders/item');

async function getTopicIds(itemId) {
  let topicIds = await Item.getTopicIds(itemId);
  if (topicIds instanceof Array) {
    return topicIds;
  }
  if (topicIds instanceof Error) {
    const url = topicIds.message;
    const anti = await Anti.getAntiId(url);
    Item.setConfig({ newanti: anti });
  }
  topicIds = await Item.getTopicIds(itemId);
  return topicIds;
}

module.exports = {
  getTopicIds,
};
