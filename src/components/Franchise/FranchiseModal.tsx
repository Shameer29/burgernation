import React, { useState } from "react";
import { FRANCHISE_TIERS } from "../../data/franchise";

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
}

export const FranchiseModal: React.FC<FranchiseModalProps> = ({
  isOpen,
  onClose,
  initialTierId = "high-street"
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    model: initialTierId,
    sqFt: "700",
    experience: "F&B / Business Experience",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-char-900 border border-crush/40 rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-500/30">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto">
              Thank you, <span className="text-crush font-semibold">{formData.fullName}</span>. A member of our BURGER NATION Franchise Development Team will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-crush text-xs font-bold uppercase tracking-wider">Step 01 & 03: RFC Application</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                BURGER NATION FRANCHISE APPLICATION
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Take the first step to owning your own QSR burger outlet.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Target City / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London, Manchester, Birmingham"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Preferred Investment Model</label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  >
                    {FRANCHISE_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.id} className="bg-char-900 text-white">
                        {tier.name} ({tier.spaceRequired})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Approx. Available Area (Sq Ft)</label>
                  <input
                    type="number"
                    placeholder="e.g. 700"
                    value={formData.sqFt}
                    onChange={(e) => setFormData({ ...formData, sqFt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Additional Notes / Background</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your business experience and site details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-crush focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-crush to-crush-dark hover:from-crush hover:to-crush text-black font-bold text-sm tracking-wide shadow-lg shadow-crush/20 transition-all duration-200"
              >
                Submit Request For Consideration (RFC)
              </button>

              <p className="text-[10px] text-gray-500 text-center">
                By submitting this form, you agree to receive communications regarding BURGER NATION franchise opportunities.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
