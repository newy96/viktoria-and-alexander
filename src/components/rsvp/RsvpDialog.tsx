
import React, {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CheckIcon,
  Loader2Icon,
  PlusIcon,
  XIcon,
} from "lucide-react";

import { HeartDivider } from "../ui/HeartDivider";
import { useRsvpForm } from "../../hooks/useRsvpForm";
import { couple, menuOptions } from "../../data/wedding";
import type { Attendance } from "../../types/wedding";

interface RsvpDialogProps {
  open: boolean;
  onClose: () => void;
}

type MenuValue = (typeof menuOptions)[number]["value"];

const attendanceOptions: {
  value: Attendance;
  label: string;
}[] = [
  { value: "yes", label: "С радост ще бъда там" },
  { value: "no", label: "За съжаление не мога" },
];

const labelClass =
  "font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-ink/70";

const inputClass =
  "mt-2 w-full min-w-0 border-b border-ink/30 bg-transparent py-2 font-serif text-lg text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none";

const ease = [0.22, 1, 0.36, 1] as const;

interface MenuSelectorProps {
  title: string;
  name: string;
  value: MenuValue;
  onChange: (value: MenuValue) => void;
}

function MenuSelector({
  title,
  name,
  value,
  onChange,
}: MenuSelectorProps) {
  return (
    <fieldset className="mt-5 min-w-0">
      <legend className={labelClass}>
        {title}
      </legend>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {menuOptions.map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className="min-w-0 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() =>
                  onChange(option.value)
                }
                className="peer sr-only"
              />

              <span
                className={`
                  flex min-h-[44px]
                  w-full items-center justify-center
                  rounded-full border
                  px-1 py-2.5
                  text-center font-serif
                  text-[clamp(11px,2.9vw,15px)]
                  leading-tight
                  transition-colors duration-300
                  peer-focus-visible:ring-2
                  peer-focus-visible:ring-wine-700/40
                  ${
                    selected
                      ? "border-wine-700 bg-wine-700 text-cream"
                      : "border-ink/25 text-ink hover:border-wine-700/50"
                  }
                `}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function RsvpDialog({
  open,
  onClose,
}: RsvpDialogProps) {
  const {
    values,
    update,
    error,
    status,
    submit,
    reset,
  } = useRsvpForm();

  const [hasCompanion, setHasCompanion] =
    useState(false);

  const [companionName, setCompanionName] =
    useState("");

  const [companionMenu, setCompanionMenu] =
    useState<MenuValue>(menuOptions[0].value);

  const [hasChild, setHasChild] =
    useState(false);

  const [childName, setChildName] =
    useState("");

  const [childMenu, setChildMenu] =
    useState<MenuValue>(menuOptions[0].value);

  const [personalNote, setPersonalNote] =
    useState("");

  const [extraError, setExtraError] =
    useState("");

  const guestsCount =
    1 +
    (hasCompanion ? 1 : 0) +
    (hasChild ? 1 : 0);

  // Заключване на фоновия скрол
  useEffect(() => {
    if (!open) return;

    const bodyOverflow =
      document.body.style.overflow;

    const htmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow =
      "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow =
        bodyOverflow;

      document.documentElement.style.overflow =
        htmlOverflow;

      window.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, [open, onClose]);

  const getMenuLabel = (value: MenuValue) => {
    return (
      menuOptions.find(
        (option) => option.value === value
      )?.label ?? String(value)
    );
  };

  // Информация за допълнителните гости
  // в съществуващото RSVP поле note.
  const formattedNote = [
    ...(values.attendance === "yes" &&
    hasCompanion
      ? [
          `Придружител: ${companionName.trim()}`,
          `Меню на придружителя: ${getMenuLabel(
            companionMenu
          )}`,
        ]
      : []),

    ...(values.attendance === "yes" &&
    hasChild
      ? [
          `Дете: ${childName.trim()}`,
          `Меню на детето: ${getMenuLabel(
            childMenu
          )}`,
        ]
      : []),

    ...(personalNote.trim()
      ? [`Бележка: ${personalNote.trim()}`]
      : []),
  ].join("\n");

  useEffect(() => {
    if (!open || status === "success") return;

    const total =
      values.attendance === "yes"
        ? guestsCount
        : 1;

    if (values.guests !== total) {
      update("guests", total);
    }

    if (values.note !== formattedNote) {
      update("note", formattedNote);
    }
  }, [
    open,
    status,
    values.attendance,
    values.guests,
    values.note,
    guestsCount,
    formattedNote,
    update,
  ]);

  const clearExtras = () => {
    setHasCompanion(false);
    setCompanionName("");
    setCompanionMenu(menuOptions[0].value);

    setHasChild(false);
    setChildName("");
    setChildMenu(menuOptions[0].value);

    setPersonalNote("");
    setExtraError("");
  };

  const handleClose = () => {
    onClose();

    window.setTimeout(() => {
      reset();
      clearExtras();
    }, 400);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    if (values.attendance === "yes") {
      if (
        hasCompanion &&
        !companionName.trim()
      ) {
        event.preventDefault();

        setExtraError(
          "Моля, въведете името на придружителя."
        );
        return;
      }

      if (hasChild && !childName.trim()) {
        event.preventDefault();

        setExtraError(
          "Моля, въведете името на детето."
        );
        return;
      }
    }

    setExtraError("");
    submit(event);
  };

  const toggleCompanion = () => {
    setHasCompanion(!hasCompanion);

    if (hasCompanion) {
      setCompanionName("");
      setCompanionMenu(menuOptions[0].value);
    }

    setExtraError("");
  };

  const toggleChild = () => {
    setHasChild(!hasChild);

    if (hasChild) {
      setChildName("");
      setChildMenu(menuOptions[0].value);
    }

    setExtraError("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-[90]
            flex items-center justify-center
            overflow-hidden
            bg-wine-950/80
            p-3 sm:p-5
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* SCROLLABLE MODAL */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-dialog-title"
            className="
              paper relative my-auto
              w-full min-w-0 max-w-lg
              max-h-[calc(100dvh-24px)]
              overflow-x-hidden overflow-y-auto
              overscroll-contain
              rounded-sm border border-ink/30
              p-2 shadow-2xl
              [-webkit-overflow-scrolling:touch]
              [scrollbar-width:thin]
              sm:max-h-[calc(100dvh-40px)]
            "
            initial={{
              opacity: 0,
              y: 22,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.98,
            }}
            transition={{
              duration: 0.4,
              ease,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              className="
                relative border border-ink/25
                px-5 pb-8 pt-10
                text-ink sm:px-10
              "
            >
              {/* CLOSE */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Затвори"
                className="
                  absolute right-3 top-3 z-20
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  text-ink/70 transition-colors
                  hover:bg-ink/10 hover:text-ink
                  focus-visible:ring-2
                  focus-visible:ring-ink/40
                "
              >
                <XIcon className="h-5 w-5" />
              </button>

              {status === "success" ? (
                <div
                  className="py-8 text-center"
                  role="status"
                >
                  <h2
                    id="rsvp-dialog-title"
                    className="font-script text-5xl sm:text-6xl"
                  >
                    Благодарим ви!
                  </h2>

                  <HeartDivider
                    className="mt-3 text-ink/60"
                  />

                  <p
                    className="
                      mx-auto mt-6 max-w-xs
                      font-serif text-xl
                      leading-relaxed
                    "
                  >
                    {values.attendance === "yes"
                      ? `Очакваме ви на ${couple.dateShort} в ${couple.venue}.`
                      : "Ще ни липсвате! Благодарим, че ни уведомихте."}
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="
                      mt-8 rounded-full
                      bg-wine-700 px-8 py-3
                      font-sans text-[11px]
                      uppercase tracking-[0.3em]
                      text-cream transition-colors
                      hover:bg-wine-800
                    "
                  >
                    Затвори
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* TITLE */}
                  <h2
                    id="rsvp-dialog-title"
                    className="
                      text-center font-script
                      text-[42px] leading-tight
                      sm:text-5xl
                    "
                  >
                    Вашият отговор
                  </h2>

                  <HeartDivider
                    className="mt-3 text-ink/60"
                    lineWidth="w-14"
                  />

                  {/* PRIMARY GUEST */}
                  <div className="mt-7">
                    <label
                      htmlFor="rsvp-name"
                      className={labelClass}
                    >
                      Име и фамилия
                    </label>

                    <input
                      id="rsvp-name"
                      type="text"
                      autoFocus={false}
                      value={values.name}
                      onChange={(event) =>
                        update(
                          "name",
                          event.target.value
                        )
                      }
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error
                          ? "rsvp-name-error"
                          : undefined
                      }
                      placeholder="напр. Мария Петрова"
                      className={inputClass}
                    />

                    {error && (
                      <p
                        id="rsvp-name-error"
                        className="
                          mt-2 font-serif
                          text-base italic
                          text-wine-600
                        "
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  {/* ATTENDANCE */}
                  <fieldset className="mt-7">
                    <legend className={labelClass}>
                      Присъствие
                    </legend>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {attendanceOptions.map(
                        (option) => (
                          <label key={option.value}>
                            <input
                              type="radio"
                              name="attendance"
                              value={option.value}
                              checked={
                                values.attendance ===
                                option.value
                              }
                              onChange={() =>
                                update(
                                  "attendance",
                                  option.value
                                )
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`
                                block cursor-pointer
                                rounded-full border
                                px-4 py-2.5
                                text-center font-serif
                                text-lg transition-colors
                                peer-focus-visible:ring-2
                                ${
                                  values.attendance ===
                                  option.value
                                    ? "border-wine-700 bg-wine-700 text-cream"
                                    : "border-ink/30 text-ink hover:border-ink"
                                }
                              `}
                            >
                              {option.label}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </fieldset>

                  {values.attendance === "yes" && (
                    <>
                      {/* MAIN GUEST MENU */}
                      <div className="mt-7 border-t border-ink/15 pt-6">
                        <p className="font-serif text-lg text-ink">
                          Вашето меню
                        </p>

                        <MenuSelector
                          title="Избор на меню"
                          name="main-menu"
                          value={values.menu}
                          onChange={(value) =>
                            update("menu", value)
                          }
                        />
                      </div>

                      {/* ADDITIONAL GUESTS */}
                      <div className="mt-8 border-t border-ink/15 pt-7">
                        <div className="text-center">
                          <p className={labelClass}>
                            Вашите гости
                          </p>

                          <p className="mt-2 font-serif text-base italic text-ink/65">
                            Ще бъдете ли с придружител
                            или дете?
                          </p>
                        </div>

                        {/* COMPANION */}
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={toggleCompanion}
                            aria-expanded={hasCompanion}
                            className={`
                              flex w-full items-center
                              justify-between gap-3
                              rounded-xl border
                              px-4 py-4 text-left
                              transition-colors duration-300
                              ${
                                hasCompanion
                                  ? "border-wine-700/50 bg-wine-700/10"
                                  : "border-ink/20 hover:border-wine-700/40"
                              }
                            `}
                          >
                            <span className="flex min-w-0 flex-col gap-1">
                              <span className="font-serif text-lg">
                                Придружител
                              </span>

                              <span className="font-serif text-sm italic text-ink/55">
                                Добавете още един възрастен
                              </span>
                            </span>

                            <span
                              className={`
                                flex h-8 w-8 shrink-0
                                items-center justify-center
                                rounded-full border
                                ${
                                  hasCompanion
                                    ? "border-wine-700 bg-wine-700 text-cream"
                                    : "border-ink/30 text-ink/70"
                                }
                              `}
                            >
                              {hasCompanion ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <PlusIcon className="h-4 w-4" />
                              )}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {hasCompanion && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.35,
                                  ease,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-4 pt-5">
                                  <label
                                    htmlFor="rsvp-companion"
                                    className={labelClass}
                                  >
                                    Име и фамилия
                                  </label>

                                  <input
                                    id="rsvp-companion"
                                    type="text"
                                    value={companionName}
                                    onChange={(event) => {
                                      setCompanionName(
                                        event.target.value
                                      );
                                      setExtraError("");
                                    }}
                                    placeholder="Име на придружителя"
                                    className={inputClass}
                                  />

                                  {/* COMPANION MENU */}
                                  <MenuSelector
                                    title="Меню за придружителя"
                                    name="companion-menu"
                                    value={companionMenu}
                                    onChange={setCompanionMenu}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* CHILD */}
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={toggleChild}
                            aria-expanded={hasChild}
                            className={`
                              flex w-full items-center
                              justify-between gap-3
                              rounded-xl border
                              px-4 py-4 text-left
                              transition-colors duration-300
                              ${
                                hasChild
                                  ? "border-wine-700/50 bg-wine-700/10"
                                  : "border-ink/20 hover:border-wine-700/40"
                              }
                            `}
                          >
                            <span className="flex min-w-0 flex-col gap-1">
                              <span className="font-serif text-lg">
                                Дете
                              </span>

                              <span className="font-serif text-sm italic text-ink/55">
                                Добавете едно дете
                              </span>
                            </span>

                            <span
                              className={`
                                flex h-8 w-8 shrink-0
                                items-center justify-center
                                rounded-full border
                                ${
                                  hasChild
                                    ? "border-wine-700 bg-wine-700 text-cream"
                                    : "border-ink/30 text-ink/70"
                                }
                              `}
                            >
                              {hasChild ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <PlusIcon className="h-4 w-4" />
                              )}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {hasChild && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.35,
                                  ease,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-4 pt-5">
                                  <label
                                    htmlFor="rsvp-child"
                                    className={labelClass}
                                  >
                                    Име на детето
                                  </label>

                                  <input
                                    id="rsvp-child"
                                    type="text"
                                    value={childName}
                                    onChange={(event) => {
                                      setChildName(
                                        event.target.value
                                      );
                                      setExtraError("");
                                    }}
                                    placeholder="Име на детето"
                                    className={inputClass}
                                  />

                                  {/* CHILD MENU */}
                                  <MenuSelector
                                    title="Меню за детето"
                                    name="child-menu"
                                    value={childMenu}
                                    onChange={setChildMenu}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* TOTAL GUESTS */}
                        <div className="mt-6 flex items-center justify-between border-t border-ink/15 pt-5">
                          <span className={labelClass}>
                            Общ брой гости
                          </span>

                          <div className="flex items-center gap-3">
                            <span className="font-display text-2xl text-wine-700">
                              {guestsCount}
                            </span>

                            <span className="font-serif text-sm italic text-ink/55">
                              {guestsCount === 1
                                ? "човек"
                                : "души"}
                            </span>
                          </div>
                        </div>

                        {extraError && (
                          <p
                            role="alert"
                            className="mt-4 font-serif text-base italic text-wine-600"
                          >
                            {extraError}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* NOTE */}
                  <div className="mt-7">
                    <label
                      htmlFor="rsvp-note"
                      className={labelClass}
                    >
                      Бележка (по желание)
                    </label>

                    <textarea
                      id="rsvp-note"
                      rows={2}
                      value={personalNote}
                      onChange={(event) =>
                        setPersonalNote(
                          event.target.value
                        )
                      }
                      placeholder="Алергии, песен за дансинга…"
                      className="
                        mt-2 w-full min-w-0
                        resize-none border-b
                        border-ink/30
                        bg-transparent py-2
                        font-serif text-lg
                        text-ink
                        placeholder:text-ink/35
                        focus:border-ink
                        focus:outline-none
                      "
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="
                      mt-8 flex w-full
                      items-center justify-center
                      gap-3 rounded-full
                      bg-wine-700 px-6 py-4
                      font-sans text-[11px]
                      uppercase tracking-[0.3em]
                      text-cream
                      transition-colors
                      hover:bg-wine-800
                      focus-visible:ring-2
                      focus-visible:ring-ink/40
                      disabled:opacity-70
                    "
                  >
                    {status === "submitting" && (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    )}

                    {status === "submitting"
                      ? "Изпращане…"
                      : "Изпрати отговор"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
