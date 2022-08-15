import { visit } from "unist-util-visit";
import { createMermaidDiv } from "./utils.mjs";

const PLUGIN_NAME = "remark-mermaid";

/**
 * Given the MDAST ast, look for all fenced codeblocks that have a language of
 * `mermaid` and pass that to mermaid.cli to render the image. Replaces the
 * codeblocks with an image of the rendered graph.
 *
 * @param {object}  ast
 * @param {vFile}   vFile
 * @return {function}
 */
function visitCodeBlock(ast, vFile) {
  return visit(ast, "code", (node, index, parent) => {
    const { lang, value, position } = node;
    let newNode;

    // If this codeblock is not mermaid, bail.
    if (lang !== "mermaid") {
      return node;
    }

    newNode = createMermaidDiv(value);
    vFile.info(`${lang} code block replaced with div`, position, PLUGIN_NAME);

    parent.children.splice(index, 1, newNode);

    return node;
  });
}

/**
 * Returns the transformer which acts on the MDAST tree and given VFile.
 *
 * If `options.simple` is passed as a truthy value, the plugin will convert
 * to `<div class="mermaid">` rather than a SVG image.
 *
 * @link https://github.com/unifiedjs/unified#function-transformernode-file-next
 * @link https://github.com/syntax-tree/mdast
 * @link https://github.com/vfile/vfile
 *
 * @param {object} options
 * @return {function}
 */
export default function mermaid(options = {}) {
  /**
   * @param {object} ast MDAST
   * @param {vFile} vFile
   * @param {function} next
   * @return {object}
   */
  return function transformer(ast, vFile, next) {
    visitCodeBlock(ast, vFile);

    if (typeof next === "function") {
      return next(null, ast, vFile);
    }

    return ast;
  };
}
