import { useFormStatus } from "react-dom";
export default function SubmitButton({ pending_text, actual_text }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? pending_text : actual_text}
    </button>
  );
}
