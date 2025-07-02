import { faker } from '@faker-js/faker';
import { test } from '../../tests/_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser'
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle'


test.describe('Edit Article tests', () => {

  test.beforeEach(async ({page, homePage, user, articleWithOneTag, }) => {
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithOneTag, true);
  });

  test('Edit the article title for the existing article', async ({
    editArticlePage,
    viewArticlePage
  }) => {
    const newArticleTitle = faker.lorem.words();

    await viewArticlePage.clickEditArticle();
    await editArticlePage.editArticleTitle(newArticleTitle);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();

    await viewArticlePage.assertArticleTitleIsVisible(newArticleTitle);
  });

  test('Edit the article description for the existing article', async ({
    editArticlePage,
    viewArticlePage
  }) => {
    const newArticleDescription = faker.lorem.sentence(2);

    await viewArticlePage.clickEditArticle();
    await editArticlePage.editArticleDescription(newArticleDescription);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();
    await viewArticlePage.clickEditArticle();

    await editArticlePage.assertArticleDescriptionChanged(
      newArticleDescription,
    );
  });

  test('Edit the article text for the existing article', async ({
    editArticlePage,
    viewArticlePage
  }) => {
    const newArticleBody = faker.lorem.sentence(2);

    await viewArticlePage.clickEditArticle();
    await editArticlePage.editArticleBody(newArticleBody);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();

    await viewArticlePage.assertArticleBodyIsVisible(newArticleBody);
  });
});
