import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { test } from '../_fixtures/fixtures';

let updatedArticle;

test.beforeEach(
  async ({
    logger,
    user,
    page,
    homePage,
    createArticlePage,
    editArticlePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
    await createNewArticle({
      article: articleWithoutTags,
      createArticlePage,
      viewArticlePage,
    });
    await editArticlePage.clickEditArticle();
    updatedArticle = generateNewArticleData(logger);
  },
);

test.describe('Edit fields of the existing article', () => {
  test('Edit the title for the existing article', async ({
    page,
    editArticlePage,
    viewArticlePage,
  }) => {
    await editArticlePage.editArticleField('titleField', updatedArticle.title);
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  });

  test('Edit the text for the existing article', async ({
    page,
    editArticlePage,
    viewArticlePage,
  }) => {
    await editArticlePage.editArticleField('textField', updatedArticle.text);
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  });

  test('Edit the description for the existing article', async ({
    page,
    editArticlePage,
    viewArticlePage,
  }) => {
    await editArticlePage.editArticleField(
      'descriptionField',
      updatedArticle.description,
    );
    await page.reload({ waitUntil: 'commit' });
    await viewArticlePage.assertArticleDescriptiontIsVisible(
      updatedArticle.description,
    );
  });
});
