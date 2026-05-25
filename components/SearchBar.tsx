type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Search your thoughts..."
        className="w-full p-2 border rounded shadow-sm text-pink-800 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}
