export function createMermaidDiv(contents) {
  return {
    type: "html",
    value: `
    <div>
<pre>
${contents}
</pre>
  <div class="mermaid">
    ${contents}
  </div>
</div>

`,
  };
}
