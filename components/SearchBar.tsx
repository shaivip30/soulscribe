type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: "14px", top: "50%",
        transform: "translateY(-50%)",
        fontSize: "0.9rem", color: "#c4a0ac",
        pointerEvents: "none",
      }}>
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your thoughts…"
        className="soulscribe-input"
        style={{
          paddingLeft: "36px",
          height: "44px",
          borderRadius: "50px",
        }}
      />
    </div>
  );
}