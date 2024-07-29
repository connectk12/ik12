import type { FormItem } from "./schema";

type SanitizeTextOpts = {
  removeSpecialChars?: boolean;
  removeWhitespace?: boolean;
  uppercase?: boolean;
};

/**
 * Sanitize Text
 *
 * This function sanitizes a given text string based on the provided options.
 * It can remove special characters, remove extra whitespace, and convert the text to uppercase.
 *
 * @param {string | (string | undefined)} text - The text to be sanitized.
 * @param {SanitizeTextOpts} [opts] - Options to customize the sanitization process.
 * @param {boolean} [opts.removeSpecialChars=true] - Whether to remove special characters from the text.
 * @param {boolean} [opts.removeWhitespace=false] - Whether to remove extra whitespace from the text.
 * @param {boolean} [opts.uppercase=true] - Whether to convert the text to uppercase.
 *
 * @returns {string | (string | undefined)} - The sanitized text.
 */

export const sanitizeText = <T extends string | (string | undefined)>(
  text: T,
  opts: SanitizeTextOpts = {
    removeSpecialChars: true,
    removeWhitespace: false,
    uppercase: true,
  }
): T => {
  if (text && typeof text === "string") {
    let sanitizedText: string = text;

    // Sanitize
    if (opts.removeSpecialChars) {
      sanitizedText = sanitizedText.replace(/[^a-zA-Z0-9\s]/g, "");
    }
    if (opts.removeWhitespace) {
      sanitizedText = sanitizedText.replace(/\s+/g, " ");
    }
    if (opts.uppercase) {
      sanitizedText = sanitizedText.toLocaleUpperCase();
    }

    // Trim
    sanitizedText = sanitizedText.trim();
    return sanitizedText as T;
  }
  return undefined as T;
};

/**
 * Get Value From Field
 *
 * This function retrieves the value of a specified field from a form.
 * It can optionally sanitize the field value based on the provided options.
 *
 * @param {FormItem} form - The form object containing the fields.
 * @param {number} fieldNumber - The number of the field to retrieve the value from.
 * @param {Object} [opts] - Options to customize the retrieval process.
 * @param {boolean} [opts.sanitize=false] - Whether to sanitize the field value.
 * @param {SanitizeTextOpts} [opts.sanitizeOpts] - Options to customize the sanitization process.
 *
 * @returns {string | undefined} - The value of the specified field, optionally sanitized.
 */
export const getValueFromField = (
  form: FormItem,
  fieldNumber: number,
  opts?: { sanitize: boolean; sanitizeOpts?: SanitizeTextOpts }
) => {
  const field = form.fields.find((field) => field.number === fieldNumber);
  if (!field) return;
  if (opts?.sanitize) {
    return sanitizeText(field.value);
  }
  return field.value;
};

/**
 * Get Array From Field
 *
 * This function retrieves the values of specified fields from a form and returns them as an array.
 * It can optionally sanitize each field value based on the provided options.
 *
 * @param {FormItem} form - The form object containing the fields.
 * @param {number[]} fieldNumbers - An array of field numbers to retrieve the values from.
 * @param {Object} [opts] - Options to customize the retrieval process.
 * @param {boolean} [opts.sanitize=false] - Whether to sanitize the field values.
 * @param {SanitizeTextOpts} [opts.sanitizeOpts] - Options to customize the sanitization process.
 *
 * @returns {string[]} - An array of values from the specified fields, optionally sanitized.
 */
export const getArrayFromField = (
  form: FormItem,
  fieldNumbers: number[],
  opts?: { sanitize: boolean; sanitizeOpts?: SanitizeTextOpts }
) => {
  const fields = form.fields.filter((field) =>
    fieldNumbers.includes(field.number)
  );
  if (opts?.sanitize) {
    return fields.map((field) => sanitizeText(field.value));
  }
  return fields.map((field) => field.value);
};
