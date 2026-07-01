import { test } from "@playwright/test";

export async function createNewArticle(createArticlePage, article) {
  await test.step(`Create new article`, async () => {
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (article.tags?.length > 0) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagsField(tag);
      }
    }

    await createArticlePage.clickPublishArticleButton();
  });
}
