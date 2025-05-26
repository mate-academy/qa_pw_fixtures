import { CreateArticlePage } from '../pages/article/CreateArticlePage';
import { HomePage } from '../pages/HomePage';

export async function createArticle(page, articleData) {
  const createArticlePage = new CreateArticlePage(page);
  const homePage = new HomePage(page);

  await homePage.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillTextField(articleData.text);
  if (articleData.tags.length > 0) {
    await createArticlePage.fillTagField(articleData.tags.toString());
  }
  await createArticlePage.clickPublishArticleButton();

  return articleData;
}
