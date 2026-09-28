import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit article', () => {
  test('Edit the article title for the existing article', async ({ page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
  articleWithOneTag,
}) => {
    const newTitle = articleWithOneTag.title;

    await signUpUser(page, user);
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTitleField(newTitle);

    // Changing the title regenerates the article slug,
    // so the new one is taken from the update response.
    const updateResponse = page.waitForResponse(
      response =>
        response.url().includes('/api/articles') &&
        response.request().method() === 'PUT',
    );

    await editArticlePage.clickUpdateArticleButton();

    const { article: updatedArticle } = await (await updateResponse).json();
    const { origin } = new URL(page.url());

    await page.goto(`${origin}/article/${updatedArticle.slug}`);

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });
});
