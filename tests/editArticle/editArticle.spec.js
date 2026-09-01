import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createAndEditArticle } from '../../src/ui/actions/article/createAndEditArticle';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Edit the article title for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    { title: `${articleWithoutTags.title} updated` },
    articleWithoutTags,
  );
});

test('Edit the article description for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    {
      description: `${articleWithoutTags.description} updated`,
    },
    articleWithoutTags,
  );
});

test('Edit the article text for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    {
      text: `${articleWithoutTags.text} updated`,
    },
    articleWithoutTags,
  );
});

test('Add the tag for the existing article without tags', async ({
  page,
  articleWithOneTag,
}) => {
  const tag = articleWithOneTag.tags[0];
  await createAndEditArticle(page, { tagsToAdd: [tag] }, articleWithOneTag);
});

test('Add the tag for the existing article with tags', async ({
  page,
  articleWithOneTag,
  articleWithTwoTags,
}) => {
  const newTag = articleWithTwoTags.tags[1];
  await createAndEditArticle(page, { tagsToAdd: [newTag] }, articleWithOneTag);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
  articleWithOneTag,
}) => {
  const createdTag = articleWithOneTag.tags[0];
  await createAndEditArticle(
    page,
    {
      tagsToRemove: [createdTag],
    },
    articleWithOneTag,
  );
});

test('Remove an article title for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    {
      title: '',
      error: TITLE_CANNOT_BE_EMPTY,
    },
    articleWithoutTags,
  );
});

test('Remove an article description for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    {
      description: '',
      error: DESCRIPTION_CANNOT_BE_EMPTY,
    },
    articleWithoutTags,
  );
});

test('Remove the article text for the existing article', async ({
  page,
  articleWithoutTags,
}) => {
  await createAndEditArticle(
    page,
    {
      text: '',
      error: BODY_CANNOT_BE_EMPTY,
    },
    articleWithoutTags,
  );
});
