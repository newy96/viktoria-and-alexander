import { FormEvent, useState } from "react";
import type { RsvpStatus, RsvpValues } from "../types/wedding";

const initialValues: RsvpValues = {
  name: "",
  attendance: "yes",
  guests: 1,
  menu: "meat",
  note: ""
};

export function useRsvpForm() {
  const [values, setValues] = useState<RsvpValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<RsvpStatus>("idle");

  const update = <K extends keyof RsvpValues,>(key: K, value: RsvpValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "name") setError(null);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (values.name.trim().length < 3) {
      setError("Моля, въведете име и фамилия.");
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 1400);
  };

  const reset = () => {
    setValues(initialValues);
    setError(null);
    setStatus("idle");
  };

  return { values, update, error, status, submit, reset };
}