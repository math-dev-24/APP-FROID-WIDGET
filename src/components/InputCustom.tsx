interface InputCustomProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

export default function InputCustom(props: InputCustomProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    const newVal: number = parseFloat(value);
    props.setValue(newVal);
    }
  
  return (
    <div className="inputForm">
      <div>{props.label}</div>
      <input
        type="number"
        className="input"
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}
