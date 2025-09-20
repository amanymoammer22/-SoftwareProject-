
export default function ContactSection() {
    return (
        <section class="bg-[var(--bg-Color)] text-white mt-16">
            <div class="max-w-5xl mx-auto px-4 py-10">
                <div class="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 class="text-3xl font-bold mb-3">Contact</h2>
                        <p class="text-white/85 leading-relaxed mb-6">
                            We would love to hear from you! please fill out the form below or get in touch with us directly using the contact information provided
                        </p>

                        <form class="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                class="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                class="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                            />

                            <textarea
                                rows="4"
                                placeholder="Message"
                                class="w-full rounded-xl bg-white/20 placeholder-white/80 text-white px-4 py-3 ring-1 ring-white/25 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"></textarea>

                            <button
                                type="submit"
                                class="inline-flex items-center px-5 py-2 rounded-lg bg-amber-400 text-black font-semibold italic shadow hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div class="flex md:justify-end">
                        <div class="w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden bg-white/10 border border-white/15 shadow-lg">
                            <img src="contactimg.jpg" alt="Decorative pillows" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
