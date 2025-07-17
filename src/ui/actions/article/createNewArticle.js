import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  const testLabel = article.tags.length
    ? 'Create a new Article with Required and Optional fields'
    : 'Create a new Article with Required fields';
  await test.step(testLabel, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagField(article.tags);
    await createArticlePage.clickPublishArticleButton();
  });
}
