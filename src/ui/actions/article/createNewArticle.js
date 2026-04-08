import { test } from '@playwright/test';

export async function createNewArticle(createArticlePage, article) {
  await test.step('Create new article', async () => {
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags?.length) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagField(tag);
        await createArticlePage.page.keyboard.press('Enter');
      }
    }
  });
}
