import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit existing article tags', () => {
  test('Add the tag for the existing article without tags', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithoutTags }) => {
    const addedTag = 'newtag';

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithoutTags.title);
    await createArticlePage.fillDescriptionField(articleWithoutTags.description);
    await createArticlePage.fillTextField(articleWithoutTags.text);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.addTag(addedTag);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();

    await viewArticlePage.assertTagIsVisible(addedTag);
  });

  test('Add the tag for the existing article with tags', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithOneTag }) => {
    const newTag = 'addedtag';

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithOneTag.title);
    await createArticlePage.fillDescriptionField(articleWithOneTag.description);
    await createArticlePage.fillTextField(articleWithOneTag.text);
    await createArticlePage.addTag(articleWithOneTag.tags[0]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.addTag(newTag);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();

    await viewArticlePage.assertTagIsVisible(articleWithOneTag.tags[0]);

    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Remove an article tag for the existing article with tag', async ({ page, user, createArticlePage, viewArticlePage, homePage, articleWithTwoTags }) => {
    const removedTag = articleWithTwoTags.tags[0];
    const keptTag = articleWithTwoTags.tags[1];

    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleWithTwoTags.title);
    await createArticlePage.fillDescriptionField(articleWithTwoTags.description);
    await createArticlePage.fillTextField(articleWithTwoTags.text);
    await createArticlePage.addTag(articleWithTwoTags.tags[0]);
    await createArticlePage.addTag(articleWithTwoTags.tags[1]);
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.clickEditArticleButton();

    await createArticlePage.removeTag(removedTag);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      createArticlePage.clickPublishArticleButton(),
    ]);

    await viewArticlePage.reloadArticlePage();

    await viewArticlePage.assertTagIsNotVisible(removedTag);

    await viewArticlePage.assertTagIsVisible(keptTag);
  });
});
