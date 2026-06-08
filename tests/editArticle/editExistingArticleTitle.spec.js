import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit existing article title', () => {
  test('Edit existing article title', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithTwoTags }) => {
    const updatedTitle = 'Updated Test Article Title';

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithTwoTags.title);
    await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
    await createArticlePage.fillTextField(articleWithTwoTags.text);
    await createArticlePage.addTag(articleWithTwoTags.tags[0]);
    await createArticlePage.addTag(articleWithTwoTags.tags[1]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.fillTitleField(updatedTitle);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();

    await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  });

  test('Remove an article title for the existing article', async ({ page, user, createArticlePage, homePage, articleWithOneTag }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.clickEditArticleButton();

    await createArticlePage.fillTitleField('');

    await createArticlePage.clickPublishArticleButton();

    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
});