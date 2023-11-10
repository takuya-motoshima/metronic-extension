import * as utils from '~/utils';

describe('Should be able to get the extension from a valid Data URL', () => {
  test.each([
    ['data:text/html,Hello%2C%20World!', 'html'],
    ['data:image/jpeg;base64,/9j/4AAQS', 'jpeg'],
    ['data:image/png;base64,iVBORw0KGg', 'png'],
    ['data:image/svg+xml;base64,PHN2Zy', 'svg'],
    ['data:application/pdf;base64,JVBE', 'pdf'],
  ])('utils.getExtensionFromDataUrl("%s") = "%s"', (a, expected) => {
    expect(utils.getExtensionFromDataUrl(a)).toBe(expected);
  });
});