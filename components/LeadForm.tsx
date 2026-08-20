"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site, projectTypes, hearAboutOptions } from "@/content/site";

export type LeadFormVariant = "hero" | "inline" | "full";

type Props = {
  variant: LeadFormVariant;
  /** Reported to analytics so we know which placement converts. */
  location: string;
  heading?: string;
  /** Pre-selects the project type on service pages. */
  defaultProjectType?: string;
  className?: string;
  /** hero forms sit on white; inline forms sit on dark grounds. */
  tone?: "light" | "dark";
};

type Errors = Partial<Record<string, string>>;

const digits = (v: string) => v.replace(/\D/g, "");

function validate(name: string, value: string, required: boolean): string {
  const v = value.trim();
  if (!v) {
    if (!required) return "";
    switch (name) {
      case "name":
        return "Tell us your name so we know who we are talking to.";
      case "phone":
        return "Enter a phone number we can reach you at.";
      case "email":
        return "Enter an email address for your written quote.";
      case "projectType":
        return "Pick the closest match — we sort out the details on the call.";
      case "street":
        return "Enter the street address of the project.";
      case "cityStateZip":
        return "Enter the city, state and ZIP of the project.";
      default:
        return "This one is required.";
    }
  }
  if (name === "phone" && (digits(v).length < 10 || digits(v).length > 11)) {
    return "Enter a 10-digit phone number we can reach you at.";
  }
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
    return "Check the email address — we could not read that one.";
  }
  return "";
}

export default function LeadForm({
  variant,
  location,
  heading = "Get a free estimate",
  defaultProjectType = "",
  className = "",
  tone = "light",
}: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const mountedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const showMessage = variant !== "hero";
  const showAddress = variant === "full";

  const required: Record<string, boolean> = {
    name: true,
    phone: true,
    email: true,
    projectType: true,
    street: showAddress,
    cityStateZip: showAddress,
    message: false,
    hearAbout: false,
  };

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setErrors((prev) => ({ ...prev, [name]: validate(name, value, required[name] ?? false) }));
  }

  function clearError(name: string) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: Errors = {};
    for (const [field, isRequired] of Object.entries(required)) {
      const msg = validate(field, data[field] ?? "", isRequired);
      if (msg) next[field] = msg;
    }
    setErrors(next);
    if (Object.keys(next).some((k) => next[k])) {
      const firstBad = Object.keys(next).find((k) => next[k]);
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formLocation: location,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));

      window.gtag?.("event", "generate_lead", {
        form_location: location,
        project_type: data.projectType,
      });

      // Never clear the entries — the browser keeps them if the user comes back.
      router.push(`/thank-you?type=${encodeURIComponent(data.projectType ?? "")}`);
    } catch {
      setStatus("failed");
    }
  }

  const dark = tone === "dark";
  const cardBg = dark ? "bg-ink text-chalk" : "bg-white text-ink";
  const labelTone = dark ? "text-slate-soft" : "";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className={`${cardBg} border hairline ${className}`}
      aria-labelledby={`lead-heading-${location}`}
    >
      {/* Walnut cap — the same edge that runs along the Quote Rail. */}
      <div className="h-1.5 bg-green" aria-hidden="true" />

      <div className="p-5 sm:p-6">
        <h2
          id={`lead-heading-${location}`}
          className="text-lg sm:text-xl leading-tight"
        >
          {heading}
        </h2>
        <p className={`mt-1 text-xs ${dark ? "text-slate-soft" : "text-ink-soft"}`}>
          {variant === "hero"
            ? "Four details is all we need to get you a number."
            : variant === "inline"
              ? "Tell us the room and the material — we take it from there."
              : "The address lets us plan the visit. Nothing here is shared."}
        </p>

        <div className="mt-5 grid gap-4">
          <Field
            id={`${location}-name`}
            name="name"
            label="Name"
            type="text"
            autoComplete="name"
            error={errors.name}
            onBlur={onBlur}
            onInput={() => clearError("name")}
            labelTone={labelTone}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id={`${location}-phone`}
              name="phone"
              label="Phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="480-555-0100"
              error={errors.phone}
              onBlur={onBlur}
              onInput={() => clearError("phone")}
              labelTone={labelTone}
              required
            />
            <Field
              id={`${location}-email`}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email}
              onBlur={onBlur}
              onInput={() => clearError("email")}
              labelTone={labelTone}
              required
            />
          </div>

          <div>
            <label htmlFor={`${location}-projectType`} className={`field-label ${labelTone}`}>
              Project type <Req />
            </label>
            <select
              id={`${location}-projectType`}
              name="projectType"
              className="field"
              defaultValue={defaultProjectType}
              aria-invalid={errors.projectType ? "true" : undefined}
              aria-describedby={errors.projectType ? `${location}-projectType-err` : undefined}
              onBlur={onBlur}
              onChange={() => clearError("projectType")}
              required
            >
              <option value="">Choose one…</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FieldError id={`${location}-projectType-err`} message={errors.projectType} />
          </div>

          {showAddress && (
            <>
              <Field
                id={`${location}-street`}
                name="street"
                label="Street address"
                type="text"
                autoComplete="street-address"
                error={errors.street}
                onBlur={onBlur}
                onInput={() => clearError("street")}
                labelTone={labelTone}
                required
              />
              <Field
                id={`${location}-cityStateZip`}
                name="cityStateZip"
                label="City, state & ZIP"
                type="text"
                autoComplete="address-level2"
                error={errors.cityStateZip}
                onBlur={onBlur}
                onInput={() => clearError("cityStateZip")}
                labelTone={labelTone}
                required
              />
              <div>
                <label htmlFor={`${location}-hearAbout`} className={`field-label ${labelTone}`}>
                  How did you hear about us?
                </label>
                <select id={`${location}-hearAbout`} name="hearAbout" className="field" defaultValue="">
                  <option value="">Optional</option>
                  {hearAboutOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {showMessage && (
            <div>
              <label htmlFor={`${location}-message`} className={`field-label ${labelTone}`}>
                Tell us about the project
              </label>
              <textarea
                id={`${location}-message`}
                name="message"
                rows={4}
                className="field resize-y"
                placeholder="Rooms, rough square footage, the material you have in mind."
              />
            </div>
          )}

          {/* Honeypot. Hidden from sight and from assistive tech, never from bots. */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
            <label htmlFor={`${location}-company`}>Company</label>
            <input id={`${location}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="btn btn-primary w-full text-base" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Get My Free Estimate"}
          </button>

          {status === "failed" && (
            <p role="alert" className="border-l-2 border-[#a1170f] bg-[#fdf0ef] px-3 py-2 text-xs text-[#7a120c]">
              Something went wrong on our end. Call{" "}
              <a className="font-semibold underline" href={site.phone.href}>
                {site.phone.display}
              </a>{" "}
              and we will take your details directly.
            </p>
          )}

          <p className={`text-xs ${dark ? "text-slate-soft" : "text-ink-soft"}`}>
            Or call{" "}
            <a className="link-rule font-mono" href={site.phone.href}>
              {site.phone.display}
            </a>
            . We answer Monday through Friday, 8am–6pm.
          </p>
        </div>
      </div>
    </form>
  );
}

function Req() {
  return (
    <span className="text-green" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-[#a1170f]">
      {message}
    </p>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  error?: string;
  labelTone?: string;
  required?: boolean;
  inputMode?: "numeric" | "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput: () => void;
};

function Field({ id, name, label, type, error, labelTone = "", required, onBlur, onInput, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={`field-label ${labelTone}`}>
        {label} {required && <Req />}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="field"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        onBlur={onBlur}
        onInput={onInput}
        required={required}
        {...rest}
      />
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}
