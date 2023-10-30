/**
 * Validation options.
 */
export default interface ValidationOptions {
  /**
   * Validate Options.
   */
  fields?: FormValidation.core.FieldsOptions;

  /**
   * The locale in the format of en_US, de_DE, fr_FR, vi_VN, for example.
   */
  locale?: string;

  /**
   * An object containing the translation of all validators.
   */
  localization?: FormValidation.core.Localization;

  /**
   * Plugins.
   */
  plugins: {
    [name: string]: FormValidation.core.Plugin<unknown>;
  };

  /**
   * Callback function to be executed when form validation is initialized (before adding fields).
   * The callback function receives a form validation instance.
   * @example
   * ```js
   * init: (instance) => {
   *   instance.on('plugins.message.placed', function (e) {
   *     // Adjust the message placement before adding fields
   *   });
   * }
   * ```
   */
  init?(core: FormValidation.core.Core): void;
}