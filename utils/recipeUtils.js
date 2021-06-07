const extractRecipePresentationData = (recipe) => {
  console.log('created at:', new Date(recipe.time));
  // console.log(recipe.blocks);

  let header = recipe.blocks.find((block) => block.type == 'header');
  let para = recipe.blocks.find((block) => block.type == 'paragraph');
  let image = recipe.blocks.find((block) => block.type == 'image');

  let presentationData = {};

  if (header) {
    presentationData.header = header.data.text;
  }

  if (para) {
    presentationData.summary = para.data.text;
  }

  if (image) {
    presentationData.imageUrl = image.data.file.url;
  }

  return presentationData;
};

module.exports = {
  extractRecipePresentationData,
};
