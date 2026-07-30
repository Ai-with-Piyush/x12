import { FileText, MessageSquareText, Search, Sparkles } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Upload any PDF",
    desc: "Drop in research papers, contracts, or notes — no setup, no formatting needed.",
  },
  {
    icon: MessageSquareText,
    title: "Chat with your data",
    desc: "Ask questions directly about your documents and get accurate, grounded answers.",
  },
  {
    icon: Search,
    title: "Instant summaries",
    desc: "Get a clear summary of long documents in seconds, not hours of reading.",
  },
  {
    icon: Sparkles,
    title: "Powered by AI",
    desc: "Built on modern AI models to understand context, not just keywords.",
  },
];

function Features() {
  return (
    <div className="bg-white text-black px-4 py-16 sm:py-20">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Everything you need</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Simple tools, built to help you actually use your documents.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-lg p-5 sm:p-6 flex flex-col gap-3 hover:border-black transition-colors"
          >
            <f.icon size={28} />
            <h3 className="font-bold text-base sm:text-lg">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Features;