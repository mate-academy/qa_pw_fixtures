import { test as base } from '../_fixtures/fixtures';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test: any = base.extend<{
  createArticlePage: CreateArticlePage,
  viewArticlePage: ViewArticlePage,
  editArticlePage: EditArticlePage,
  articleWithoutTags: string,
  articleWithOneTag: string,
  articleWithTwoTags: string
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    
    await use(createArticlePage)
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);
    
    await use(viewArticlePage)
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);
    
    await use(editArticlePage)
  },
  articleWithoutTags: async({homePage, createArticlePage, logger, viewArticlePage}, use) => {
  const article = generateNewArticleData(logger);
    
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  },
  articleWithOneTag: async({homePage, createArticlePage, logger, viewArticlePage}, use) => {
  const article = generateNewArticleData(logger);
    
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  },
  articleWithTwoTags: async({homePage, createArticlePage, logger, viewArticlePage}, use) => {
  const article = generateNewArticleData(logger);
    
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  },
})