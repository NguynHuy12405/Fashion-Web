
export default function SelectForm({ label, options, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...rest} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
        <option value="">Chọn...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
