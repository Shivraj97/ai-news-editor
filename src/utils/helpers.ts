import { OutputData } from '@editorjs/editorjs'

export function convertEditorJsonToText(editorData: OutputData): string {
  let text = ''

  // Iterate over each block in the Editor.js output
  editorData.blocks.forEach((block) => {
    // Depending on the type of block, extract relevant text content
    switch (block.type) {
      case 'paragraph':
        text += `${block.data.text}\n`
        break
      case 'header':
        text += `${block.data.text}\n`
        break
      // You can handle other block types similarly
      default:
        // Ignore other block types or handle them as needed
        // text += `${block.data.text}\n`
        break
    }
  })

  return text.trim() // Trim any trailing whitespace
}
