import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navigation */}
            <nav className="fixed w-full z-10 backdrop-blur-sm bg-slate-900/50 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-white">
                                CaseBud
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-slate-300 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modified Hero Section - Remove payment references */}
            <div className="relative pt-24">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute inset-0 bg-slate-900/50"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center space-y-8">
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                            Open Beta 🚀
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
                            Be Among the First to
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                                {' '}
                                Shape the Future{' '}
                            </span>
                            of Legal Tech
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Join our community and help revolutionize the legal
                            industry with cutting-edge AI technology.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
                            >
                                Join Now - It's Free
                            </Link>
                            <a
                                href="#about"
                                className="border border-slate-600 text-slate-300 px-8 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200"
                            >
                                Learn More
                            </a>
                        </div>
                        <div className="pt-4">
                            <p className="text-slate-400 text-sm">
                                🎉 Early Access: Be part of our growing
                                community
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* After Hero Section and before Features Section */}
            <div className="relative bg-slate-800/30 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Problem Statement */}
                    <div className="text-center mb-20">
                        <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                            The Challenge
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            Why We Built CaseBud
                        </h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Legal professionals spend countless hours on
                            research and document analysis, limiting their
                            ability to serve more clients and focus on strategic
                            work. Access to advanced legal technology has
                            traditionally been limited to large firms with
                            substantial resources.
                        </p>
                    </div>

                    {/* Vision & Mission */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Our Vision
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                                To democratize access to advanced legal
                                technology, making sophisticated legal research
                                and analysis tools available to every legal
                                professional, regardless of firm size or
                                resources.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Our Mission
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                                Empower legal professionals with AI-driven tools
                                that enhance their capabilities, improve
                                efficiency, and enable them to deliver better
                                legal services to their clients.
                            </p>
                        </div>
                    </div>

                    {/* Our Solution */}
                    <div className="text-center mb-12">
                        <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                            Our Solution
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                            Free Access to Advanced Legal AI
                        </h2>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            We're making CaseBud completely free because we
                            believe in:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-400 text-xl font-bold mb-4">
                                Equal Access
                            </div>
                            <p className="text-slate-300">
                                Every legal professional deserves access to
                                advanced tools, regardless of their resources
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-400 text-xl font-bold mb-4">
                                Community Growth
                            </div>
                            <p className="text-slate-300">
                                Building a community of forward-thinking legal
                                professionals who shape the future together
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-400 text-xl font-bold mb-4">
                                Innovation First
                            </div>
                            <p className="text-slate-300">
                                Prioritizing innovation and improvement through
                                user feedback and collaboration
                            </p>
                        </div>
                    </div>

                    {/* Why Free Badge */}
                    <div className="mt-16 text-center">
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                            Why We're Free
                        </span>
                        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                            We believe that by making our platform freely
                            available, we can gather valuable insights from real
                            users, improve our technology, and build a strong
                            community of legal professionals who will help shape
                            the future of legal tech.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modified Early Access Benefits */}
            <div id="early-access" className="relative bg-slate-800/50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">
                            Community Benefits
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Join us in shaping the future of legal technology
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-500 text-xl font-bold mb-4">
                                Early Access
                            </div>
                            <p className="text-slate-300">
                                Be among the first to use and shape our AI legal
                                assistant
                            </p>
                        </div>
                        <div className="bg-slate-800 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-500 text-xl font-bold mb-4">
                                Direct Impact
                            </div>
                            <p className="text-slate-300">
                                Your feedback directly influences our
                                development roadmap
                            </p>
                        </div>
                        <div className="bg-slate-800 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                            <div className="text-blue-500 text-xl font-bold mb-4">
                                Community Support
                            </div>
                            <p className="text-slate-300">
                                Join a network of forward-thinking legal
                                professionals
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Section */}
            <div className="relative bg-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">
                            Investment Opportunity
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Be part of the next big thing in legal tech
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-8 border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-4">
                                For Investors
                            </h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-blue-500 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Early-stage investment opportunities
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-blue-500 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Ground floor entry in legal tech innovation
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-blue-500 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Direct influence on product roadmap
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 border border-blue-500/50">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Contact Us
                            </h3>
                            <p className="text-blue-100 mb-6">
                                Interested in investment opportunities or
                                partnership? Let's connect.
                            </p>
                            <a
                                href="mailto:invest@casebud.com"
                                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                            >
                                Get in Touch
                                <svg
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Beta Testing Section */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Join Our Beta Program Today
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Limited spots available. Be part of something
                        revolutionary.
                    </p>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                    >
                        Get Early Access
                    </Link>
                    <p className="mt-4 text-sm text-blue-200">
                        No credit card required
                    </p>
                </div>
            </div>

            {/* AI Disclaimer Section */}
            <div className="bg-slate-800/50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-xl bg-slate-800 p-8 border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">
                            Important Disclaimer
                        </h3>
                        <div className="space-y-4 text-sm text-slate-300">
                            <p>
                                CaseBud is an AI-powered legal research
                                assistant designed to support legal
                                professionals. While we strive for accuracy:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Our AI provides research assistance and
                                    suggestions, not legal advice
                                </li>
                                <li>
                                    All outputs should be verified by qualified
                                    legal professionals
                                </li>
                                <li>
                                    Users maintain full responsibility for their
                                    legal work and decisions
                                </li>
                                <li>
                                    Results may vary and should be independently
                                    verified
                                </li>
                            </ul>
                            <p className="text-xs text-slate-400 mt-4">
                                By using CaseBud, you acknowledge that it is a
                                research tool and not a substitute for
                                professional legal judgment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modified CTA Section */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Legal Practice?
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Join leading legal professionals using CaseBud
                    </p>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                    >
                        Start Now
                    </Link>
                </div>
            </div>

            {/* Key Features with Stats */}
            <div className="relative bg-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">
                            Powerful Features That Matter
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Real solutions for real legal challenges
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <div className="flex items-center justify-center mb-4">
                                <div className="text-4xl font-bold text-blue-500">
                                    85%
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-2">
                                Time Saved
                            </h3>
                            <p className="text-slate-300 text-center">
                                In legal research and document analysis tasks
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <div className="flex items-center justify-center mb-4">
                                <div className="text-4xl font-bold text-blue-500">
                                    24/7
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-2">
                                Availability
                            </h3>
                            <p className="text-slate-300 text-center">
                                Instant responses to your legal queries anytime
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <div className="flex items-center justify-center mb-4">
                                <div className="text-4xl font-bold text-blue-500">
                                    100%
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-2">
                                Free Access
                            </h3>
                            <p className="text-slate-300 text-center">
                                No hidden costs or subscription fees
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Use Cases Section */}
            <div className="relative bg-slate-800/30 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">
                            Real-World Applications
                        </h2>
                        <p className="mt-4 text-slate-400">
                            How legal professionals are using CaseBud
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg">
                                    <svg
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Document Review
                                    </h3>
                                    <p className="text-slate-300">
                                        Analyze contracts, legal documents, and
                                        case files in minutes instead of hours
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                        <li className="flex items-center">
                                            <svg
                                                className="h-4 w-4 mr-2 text-blue-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Contract analysis
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                className="h-4 w-4 mr-2 text-blue-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Legal document summaries
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Add more use cases... */}
                    </div>
                </div>
            </div>

            {/* Development Roadmap */}
            <div className="relative bg-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">
                            Development Roadmap
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Help shape our future features
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">
                                        1
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Phase 1: Core Features (Current)
                                    </h3>
                                    <p className="text-slate-300">
                                        Document analysis, legal research
                                        assistance, and case law searching
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">
                                        2
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Phase 2: Advanced Features (Coming Soon)
                                    </h3>
                                    <p className="text-slate-300">
                                        Multi-language support, document
                                        generation, and collaborative tools
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">
                                        3
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Phase 3: Integration & Expansion
                                    </h3>
                                    <p className="text-slate-300">
                                        API access, third-party integrations,
                                        and specialized practice areas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Community Section */}
            <div className="relative bg-slate-800/30 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-8">
                            {' '}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2"></div>
                                <p className="text-slate-300"> </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2"></div>
                                <p className="text-slate-300"> </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2"></div>
                                <p className="text-slate-300"> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Features data
const features = [
    {
        title: 'Smart Legal Research',
        description:
            'AI-powered research assistant that helps you find relevant cases and precedents quickly.',
        icon: (
            <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        )
    },
    {
        title: 'Document Analysis',
        description:
            'Analyze legal documents instantly with advanced natural language processing.',
        icon: (
            <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        )
    },
    {
        title: '24/7 Assistance',
        description:
            'Get instant answers to your legal questions anytime, anywhere.',
        icon: (
            <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        )
    }
];

export default Landing;
