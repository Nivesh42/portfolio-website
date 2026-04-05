"use client";

import { useState } from "react";

import type { ContactData } from "@/types";

interface ContactProps {
    data: ContactData;
}

export const Contact = ({ data }: ContactProps) => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            alert("Message sent!");
            setForm({ name: "", email: "", message: "" });
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <section id="contact" className="min-h-full bg-background flex items-center justify-center px-6 py-24">
            <div className="container-main flex items-center justify-center">
                <div className="border border-border p-10 w-full max-w-md">

                    <h2 className="text-h2 font-bold uppercase tracking-tight text-foreground mb-10">
                        {data?.heading ?? "Start Transmission"}
                    </h2>

                    <div className="flex flex-col gap-6">

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                                {data?.nameLabel ?? "Identification"}
                            </label>
                            <input
                                type="text"
                                placeholder={data?.namePlaceholder ?? "YOUR NAME"}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                                {data?.emailLabel ?? "Routing Address"}
                            </label>
                            <input
                                type="email"
                                placeholder={data?.emailPlaceholder ?? "EMAIL@EXAMPLE.COM"}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase font-medium tracking-widest text-muted-foreground">
                                {data?.messageLabel ?? "Payload"}
                            </label>
                            <textarea
                                placeholder={data?.messagePlaceholder ?? "WHAT ARE WE BUILDING?"}
                                rows={4}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary resize-none"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-background border border-border text-foreground text-sm font-medium uppercase tracking-widest py-4 hover:bg-primary hover:text-primary-foreground hover:border-primary mt-2"
                        >
                            {data?.submitLabel ?? "Initialize Contact"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};