import { expect } from '@playwright/test';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.describe('Conduit - Edit Article Feature Tests', () => {
  test.describe('Article without tags', () => {
    test.beforeEach(
      async ({ page, user, articleWithoutTags, createArticlePage }) => {
        await signUpUser(page, user);
        await page.goto('/editor');
        await createArticlePage.fillTitleField(articleWithoutTags.title);
        await createArticlePage.fillDescriptionField(
          articleWithoutTags.description,
        );
        await createArticlePage.fillTextField(articleWithoutTags.text);
        await createArticlePage.clickPublishArticleButton();
        await page.waitForURL('**/article/**');

        await page.getByRole('link', { name: 'Edit Article' }).first().click();
        await page.waitForURL('**/editor/**');
      },
    );

    test('Edit the article title for the existing article', async ({
      page,
      editArticlePage,
    }) => {
      const newTitle = 'Update Title ' + Date.now();

      await editArticlePage.fillTitleField(newTitle);
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await editArticlePage.assertArticleTitle(newTitle);
    });

    test('Edit the article description for the existing article', async ({
      page,
      editArticlePage,
    }) => {
      const newDescription = 'Updated description content';

      await editArticlePage.fillDescriptionField(newDescription);
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await page.getByRole('link', { name: 'Home' }).click();
      await page.getByText('Global Feed').click();
      await expect(page.locator('.article-preview').first()).toContainText(
        newDescription,
      );
    });

    test('Edit the article text for the existing article', async ({
      page,
      editArticlePage,
    }) => {
      const newBody = 'Updated body content text markdown';

      await editArticlePage.fillBodyField(newBody);
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await editArticlePage.assertArticleText(newBody);
    });

    test('Add the tag for the existing article without tags', async ({
      page,
      editArticlePage,
    }) => {
      await editArticlePage.fillTag('playwright');
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await expect(page.locator('.tag-list')).toContainText('playwright');
    });

    test('Remove an article title for the existing article', async ({
      editArticlePage,
    }) => {
      await editArticlePage.clearTitleField();
      await editArticlePage.clickUpdateArticleButton();

      await editArticlePage.assertErrorMessageContainsText(
        TITLE_CANNOT_BE_EMPTY,
      );
    });

    test('Remove an article body for the existing article', async ({
      editArticlePage,
    }) => {
      await editArticlePage.clearBodyField();
      await editArticlePage.clickUpdateArticleButton();

      await editArticlePage.assertErrorMessageContainsText(
        BODY_CANNOT_BE_EMPTY,
      );
    });

    test('Remove an article description for the existing article', async ({
      editArticlePage,
    }) => {
      await editArticlePage.clearDescriptionField();
      await editArticlePage.clickUpdateArticleButton();

      await editArticlePage.assertErrorMessageContainsText(
        DESCRIPTION_CANNOT_BE_EMPTY,
      );
    });

    test('Edit multiple fields simultaneously', async ({
      page,
      editArticlePage,
    }) => {
      const multiUpdate = {
        title: 'Completely New Title ' + Date.now(),
        description: 'New fresh description',
        body: 'Updated full markdown body text',
      };

      await editArticlePage.fillTitleField(multiUpdate.title);
      await editArticlePage.fillDescriptionField(multiUpdate.description);
      await editArticlePage.fillBodyField(multiUpdate.body);
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await editArticlePage.assertArticleTitle(multiUpdate.title);
      await editArticlePage.assertArticleText(multiUpdate.body);
    });
  });

  test.describe('Article with one tag', () => {
    test.beforeEach(
      async ({ page, user, articleWithOneTag, createArticlePage }) => {
        await signUpUser(page, user);
        await page.goto('/editor');
        await createArticlePage.fillTitleField(articleWithOneTag.title);
        await createArticlePage.fillDescriptionField(
          articleWithOneTag.description,
        );
        await createArticlePage.fillTextField(articleWithOneTag.text);
        await createArticlePage.fillTagField(articleWithOneTag.tags[0]);
        await createArticlePage.clickPublishArticleButton();
        await page.waitForURL('**/article/**');

        await page.getByRole('link', { name: 'Edit Article' }).first().click();
        await page.waitForURL('**/editor/**');
      },
    );

    test('Remove an article tag for the existing article with tag', async ({
      page,
      editArticlePage,
      articleWithOneTag,
    }) => {
      await editArticlePage.removeTag();
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await expect(page.locator('.tag-list')).not.toContainText(
        articleWithOneTag.tags[0],
      );
    });

    test('Add the tag for the existing article with tags', async ({
      page,
      editArticlePage,
    }) => {
      await editArticlePage.fillTag('second-tag');
      await editArticlePage.clickUpdateArticleButton();
      await page.waitForURL('**/article/**');
      await page.reload();

      await expect(page.locator('.tag-list')).toContainText('second-tag');
    });
  });
});
