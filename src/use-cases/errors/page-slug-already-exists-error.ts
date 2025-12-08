export class PageSlugAlreadyExistsError extends Error {
  constructor() {
    super('Slug already exists');
  }
}
