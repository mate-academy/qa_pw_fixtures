import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger, { tagsCount = 0 } = {}) {
  const article = {
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(5),
    text: faker.lorem.paragraph(),
    tags: faker.helpers.multiple(
      () => faker.lorem.word() + faker.string.alphanumeric(5),
      { count: tagsCount },
    ),
  };

  logger.debug(`New article generated: ${JSON.stringify(article)}`);

  return article;
}
