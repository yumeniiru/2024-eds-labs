/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const convertXF = (main, document) => {
  const cell = [['cards']];
  main.querySelectorAll('.experiencefragment').forEach((xf) => {
    const image = xf.getElementsByTagName('img')[0];
    const title = xf.getElementsByTagName('h3')[0];
    const description = xf.getElementsByTagName('h5')[0];
    const div = document.createElement('div');
    div.append(image);
    div.append(title);
    div.append(description);
    cell.push([div]);
  });
  const table = WebImporter.DOMUtils.createTable(cell, document);
  main.append(table);
};

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => {
    console.log('inside import js');
    const main = document.body;
    WebImporter.DOMUtils.remove(main, [
      'nav',
      'footer',
      'header',
      '.cmp-buildingblock--btn-list',
    ]);
    convertXF(main, document);
    // create the metadata block and append it to the main element
    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => WebImporter.FileUtils.sanitizePath(new URL(url).pathname.replace(/\.html$/, '').replace(/\/$/, '')),
};
