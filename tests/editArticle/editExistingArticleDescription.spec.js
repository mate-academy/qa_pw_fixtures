import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit existing article description', () => {
  test('Edit existing article description', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithOneTag }) => {
    const updatedDescription = 'Updated article description for editing test.';

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.fillDescriptionField(updatedDescription);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.assertDescriptionFieldValue(updatedDescription);
  });

  test('Remove an article description for the existing article', async ({ page, user, createArticlePage, homePage, articleWithOneTag }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.clickEditArticleButton();

    await createArticlePage.fillDescriptionField('');

    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  });
});
