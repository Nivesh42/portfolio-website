"use client";

import { useState } from "react";


type ContactData = {
    heading?: string;
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submitLabel?: string;
};

export const Contact = ({ data }: { data: ContactData }) => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // handle submission
        console.log(form);
    };

    return (
        <section className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
            <div className="container-main flex items-center justify-center">
                <div className="border border-border p-10 w-full max-w-md">
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-10">
                        {data?.heading ?? "Start Transmission"}
                    </h2>

                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">
                                {data?.nameLabel ?? "Identification"}
                            </label>
                            <input
                                type="text"
                                placeholder={data?.namePlaceholder ?? "YOUR NAME"}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-sm uppercase tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">
                                {data?.emailLabel ?? "Routing Address"}
                            </label>
                            <input
                                type="email"
                                placeholder={data?.emailPlaceholder ?? "EMAIL@EXAMPLE.COM"}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-sm uppercase tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">
                                {data?.messageLabel ?? "Payload"}
                            </label>
                            <textarea
                                placeholder={data?.messagePlaceholder ?? "WHAT ARE WE BUILDING?"}
                                rows={4}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="bg-transparent border border-border px-4 py-3 text-sm uppercase tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-background border border-border text-foreground text-sm font-medium uppercase tracking-widest py-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors mt-2"
                        >
                            {data?.submitLabel ?? "Initialize Contact"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};