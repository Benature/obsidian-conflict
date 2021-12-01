import { MarkdownView, Plugin } from "obsidian";

export default class Conflict extends Plugin {
  async onload() {
    // This adds a simple command that can be triggered anywhere
    this.addCommand({
      id: "find-conflict",
      name: "Find conflict files",
      callback: () => this.conflict(),
    });
  }

  conflict(): void {
    var files = this.app.vault.getMarkdownFiles();
    var conflicts = [];
    // for (let file of files) {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      // console.log(file.basename);
      if (file.basename.endsWith(`(1)`)) {
        conflicts.push({ conflict: file, raw: files[++i] });
      }
    }

    // console.log(conflicts);

    if (conflicts.length) {
      let markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!markdownView) {
        return;
      }
      let editor = markdownView.editor;
      var output = `\n\n|raw|conflict|\n|---|--------|\n`;
      for (let i = 0; i < conflicts.length; i++) {
        let conflict = conflicts[i];
        output += `|[[${conflict.raw.basename}]]|[[${conflict.conflict.basename}]]|`;
      }
      output += `\n\n`;
      editor.replaceSelection(output);
    }
  }
}
