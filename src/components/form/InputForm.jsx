import React from 'react'

export default function InputForm({ label, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...rest} className="w-full px-3 py-2 border rounded-lg text-sm" />
    </div>
  )
}
