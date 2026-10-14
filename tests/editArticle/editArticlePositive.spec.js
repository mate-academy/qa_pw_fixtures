import { test } from '../_fixtures/fixtures';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({ page, 
  articleWithoutTags,
  viewArticlePage,
  editArticlePage 
}) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  const newTitle = 'Updated article title';

  await editArticlePage.fillTitleField(newTitle);

  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForEditArticleButtonIsVisible();
  await viewArticlePage.reload();

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', 
  async ({ page, 
    articleWithoutTags,
    editArticlePage,
    viewArticlePage
}) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  const newDescription = 'Updated article content description';

  await editArticlePage.fillDescriptionField(newDescription);

  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/articles/') 
    && response.status() === 200
  );

  await editArticlePage.clickUpdateArticleButton();

  await responsePromise;
  await editArticlePage.clickYourProfileImage(); 
  await viewArticlePage.assertArticleDescriptionIsVisible(newDescription);
});

test('Edit the article text for the existing article', async ({ page, 
    articleWithoutTags,
    editArticlePage,
    viewArticlePage }) => {
  await createNewArticle(page, articleWithoutTags);
  await viewArticlePage.clickEditArticleButton();

  const newText = 'Updated arcticle content text';

  await editArticlePage.fillTextField(newText);

  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForEditArticleButtonIsVisible();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test.describe('Edit article tags', () => {

  test('Add a tag for an existing article without tags', 
    async ({ page, 
      articleWithoutTags,
      viewArticlePage,
      editArticlePage
  }) => {
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();

    const newTag = 'qa-automation';
    await editArticlePage.fillTagsField(newTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(newTag);
  });

  test('Add a tag for an existing article with tags', 
    async ({ page, 
      articleWithOneTag,
      viewArticlePage,
      editArticlePage 
  }) => {
    const initialTag = articleWithOneTag.tags[0];
    await createNewArticle(page, articleWithOneTag);

    await viewArticlePage.clickEditArticleButton();

    const additionalTag = 'playwright-test';
    await editArticlePage.fillTagsField(additionalTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsVisible(initialTag);
    await viewArticlePage.assertArticleTagIsVisible(additionalTag);
  });

  test('Remove an article tag for the existing article with tag', 
    async ({ page, 
      articleWithTwoTags,
      viewArticlePage,
      editArticlePage 
  }) => {
    const existingTag = articleWithTwoTags.tags[0];
    await createNewArticle(page, articleWithTwoTags);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.removeTag(existingTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagIsNotVisible(existingTag);
  });
});
