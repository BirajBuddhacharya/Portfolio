'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello Tiptap ✨</p>',
  })

  if (!editor) return null

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {/* Toolbar */}
      <div className="flex gap-2 border rounded-t px-3 py-2 bg-gray-100">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          H3
        </button>
        <div className="flex-grow" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 hover:bg-gray-200 rounded"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 hover:bg-gray-200 rounded"
        >
          Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="ProseMirror border border-t-0 rounded-b p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  )
}
