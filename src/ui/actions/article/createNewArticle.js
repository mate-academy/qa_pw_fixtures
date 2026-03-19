export async function createNewArticle({
  article,
  createArticlePage,
  viewArticlePage,
}) {
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
}
