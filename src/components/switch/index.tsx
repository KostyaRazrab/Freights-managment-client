import './style.css'

type Props = {
    checked: boolean
    onChange: ()=> void
}
export default function Switch(props: Props) {
  return (
    <label className="switch">
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <span className="slider round"></span>
    </label>
  );
}
