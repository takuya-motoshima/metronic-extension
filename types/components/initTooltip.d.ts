/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jstree" />
/// <reference types="bootstrap" />
/// <reference types="daterangepicker" />
/// <reference types="dropzone" />
import bootstrap from '~/misc/bootstrap';
/**
 * Initialize the tooltip.
 */
declare const _default: (context: JQuery | HTMLElement, tooltipSelector?: string) => bootstrap.Tooltip[];
export default _default;
