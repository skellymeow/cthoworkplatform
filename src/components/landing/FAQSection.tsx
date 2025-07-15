import { motion } from "framer-motion"
import { animations } from "@/lib/animations"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqData: FAQ[]
  openFaq: number | null
  setOpenFaq: (idx: number | null) => void
}

export default function FAQSection({ faqData, openFaq, setOpenFaq }: FAQSectionProps) {
  return (
    <section id="faq" className="py-8 md:py-16 lg:py-20 bg-black px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-6 md:mb-12"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>
        <div className="space-y-4 md:space-y-6">
          {faqData.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 md:p-6 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-bold text-white">{faq.question}</h3>
                <span className="text-purple-400 font-bold text-lg md:text-xl">{openFaq === idx ? '-' : '+'}</span>
              </div>
              {openFaq === idx && (
                <motion.p
                  className="text-gray-400 text-sm md:text-base mt-2 md:mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 