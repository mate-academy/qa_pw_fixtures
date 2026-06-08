import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit existing article text', () => {
  test('Edit existing article text', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithOneTag }) => {
    const updatedText = 'Updated article body text for editing test.';

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.fillTextField(updatedText);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();

    await viewArticlePage.assertArticleTextIsVisible(updatedText);
  });

  test('Remove the article text for the existing article', async ({ page, user, createArticlePage, homePage, articleWithOneTag }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.clickEditArticleButton();

    await createArticlePage.fillTextField('');

    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
  });
});
