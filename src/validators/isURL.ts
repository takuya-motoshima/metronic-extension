import validator from 'validator';
import {merge} from 'deep-fusion';
import IsURLOptions from '~/interfaces/IsURLOptions'

/**
 * Check if it is a URL.
 */
export default (value: string, options?: IsURLOptions): boolean => {
  // Initialize options.
  options = merge({
    requireFQDNTld: true,
    allowFQDNWildcard: false,
    requirePort: false,
    allowFragments: false,
    allowQueryComponents: false,
  }, options);

  // Returns validation results.
  return validator.isURL(value, {
    protocols: ['https', 'http'],// Valid protocols can be modified with this option.
    require_protocol: true,// If true, returns false if no protocols correspond to the protocols option.
    require_valid_protocol: true,// Checks if the protocol is present in the protocols option.
    require_host: true,// If false, do not check if the host exists in the URL.
    allow_underscores: false,// If true, allows the use of underscore characters in the domain. Default is false.
    allow_trailing_dot: false,// If true, remove the trailing dot from the domain before checking for validity. Default is false.
    allow_protocol_relative_urls: false, // If true, protocol relative URLs are allowed.
    require_port: false,// If true, port number is required. Default is false.
    require_tld: options?.requireFQDNTld,// If true, the TLD is required. Default is true.
    // @ts-ignore
    allow_wildcard: options.allowFQDNWildcard,// If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
    allow_fragments: options?.allowFragments,// If true, allow fragment input. Default is false.
    allow_query_components: options?.allowQueryComponents,// If true, allow input of query string. Default is false.
  });
}