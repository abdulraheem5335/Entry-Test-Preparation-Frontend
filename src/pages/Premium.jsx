import React, { useState } from "react";
import { Link } from "react-router-dom";

const Premium = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

    const plans = [
        {
            name: "Basic",
            priceMonthly: 999,
            priceYearly: 799,
            features: [
                "Access to 1 exam track",
                "500 MCQs per subject",
                "Basic notes",
                "Email support",
                "Progress tracking"
            ],
            notIncluded: ["Video lectures", "Mock tests", "AI analytics", "Priority support"],
            popular: false,
            color: "slate"
        },
        {
            name: "Pro",
            priceMonthly: 2499,
            priceYearly: 1999,
            features: [
                "Access to all exam tracks",
                "Unlimited MCQs",
                "Comprehensive notes",
                "Video lectures",
                "5 mock tests per month",
                "Progress analytics",
                "Email support"
            ],
            notIncluded: ["AI-powered insights", "Priority support"],
            popular: true,
            color: "blue"
        },
        {
            name: "Ultimate",
            priceMonthly: 4999,
            priceYearly: 3999,
            features: [
                "Everything in Pro",
                "Unlimited mock tests",
                "AI-powered analytics",
                "Personalized study plans",
                "1-on-1 mentorship sessions",
                "Priority support",
                "Early access to new content",
                "Downloadable resources"
            ],
            notIncluded: [],
            popular: false,
            color: "violet"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                    </svg>
                    Premium Plans
                </span>
                <h1 className="text-3xl font-bold text-slate-900">Unlock Your Full Potential</h1>
                <p className="text-slate-500 mt-2 max-w-xl mx-auto">
                    Get unlimited access to all features and accelerate your exam preparation
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle("yearly")}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'}`}
                    >
                        Yearly <span className="text-emerald-600 font-semibold">Save 20%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {plans.map(plan => (
                    <div
                        key={plan.name}
                        className={`bg-white rounded-2xl border-2 p-6 relative ${plan.popular
                                ? 'border-blue-500 shadow-xl shadow-blue-100'
                                : 'border-slate-200'
                            }`}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                                Most Popular
                            </span>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                            <div className="mt-4">
                                <span className="text-4xl font-bold text-slate-900">
                                    Rs. {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                                </span>
                                <span className="text-slate-500">/month</span>
                            </div>
                            {billingCycle === 'yearly' && (
                                <p className="text-sm text-emerald-600 mt-1">
                                    Billed Rs. {plan.priceYearly * 12}/year
                                </p>
                            )}
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                            {plan.notIncluded.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-3 rounded-xl font-semibold transition ${plan.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {plan.popular ? 'Get Started' : 'Choose Plan'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Features Comparison */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
                <h3 className="font-semibold text-slate-900 mb-4 text-center">Why Go Premium?</h3>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                    {[
                        { icon: "🎯", title: "10x More MCQs", desc: "Practice with unlimited questions" },
                        { icon: "📹", title: "Video Lectures", desc: "Learn from expert instructors" },
                        { icon: "📊", title: "AI Analytics", desc: "Smart performance insights" },
                        { icon: "👨‍🏫", title: "Mentorship", desc: "1-on-1 guidance sessions" }
                    ].map((item, i) => (
                        <div key={i} className="p-4">
                            <span className="text-3xl">{item.icon}</span>
                            <h4 className="font-semibold text-slate-900 mt-2">{item.title}</h4>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {[
                        { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. No questions asked." },
                        { q: "What payment methods are accepted?", a: "We accept credit/debit cards, JazzCash, EasyPaisa, and bank transfers." },
                        { q: "Is there a free trial?", a: "Yes! All new users get a 7-day free trial of the Pro plan." },
                        { q: "Can I switch plans?", a: "Absolutely! You can upgrade or downgrade your plan at any time." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                            <h4 className="font-medium text-slate-900">{faq.q}</h4>
                            <p className="text-sm text-slate-500 mt-1">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
                <Link to="/profile/dashboard" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Premium;
