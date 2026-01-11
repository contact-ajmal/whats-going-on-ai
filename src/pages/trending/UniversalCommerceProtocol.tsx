import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Zap, Shield, Globe, Check, Copy, CheckCircle,
    ShoppingCart, CreditCard, Code, Users, Store, Smartphone, Building2,
    Layers, GitBranch, ExternalLink, Package, Tag, Truck, Play, Terminal
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

// --- Reusable Components ---

const CodeBlock = ({ code, title, language = "bash" }: { code: string; title?: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 my-4">
            {title && (
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-mono text-slate-400">{title}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 text-xs">
                        {copied ? <CheckCircle className="w-3 h-3 mr-1 text-green-400" /> : <Copy className="w-3 h-3 mr-1" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm">
                <code className={`language-${language} text-slate-300`}>{code}</code>
            </pre>
        </div>
    );
};

const BenefitCard = ({ icon: Icon, title, description, color }: {
    icon: any; title: string; description: string; color: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 hover:border-${color}-500/30 transition-all`}
    >
        <div className={`p-3 rounded-lg bg-${color}-500/10 w-fit mb-4`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const PartnerLogo = ({ name }: { name: string }) => (
    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:border-white/20 transition-all">
        {name}
    </div>
);

const StepCard = ({ step, title, children }: { step: number; title: string; children: React.ReactNode }) => (
    <div className="relative pl-8 pb-8 border-l-2 border-cyan-500/30 last:border-l-transparent">
        <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {step}
        </div>
        <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
        <div className="text-slate-400">{children}</div>
    </div>
);

const CapabilityCard = ({ icon: Icon, name, description, extends: extendsCapability }: {
    icon: any; name: string; description: string; extends?: string;
}) => (
    <div className="p-4 rounded-xl border border-white/10 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-2">
            <Icon className="w-5 h-5 text-cyan-400" />
            <code className="text-sm text-cyan-300">{name}</code>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
        {extendsCapability && (
            <p className="text-xs text-slate-500 mt-2">
                Extends: <code className="text-violet-400">{extendsCapability}</code>
            </p>
        )}
    </div>
);

// --- Main Component ---

export default function UniversalCommerceProtocol() {
    const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'integration'>('overview');

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Universal Commerce Protocol (UCP) | Trending AI Tech"
                description="Google's open-source standard for agentic commerce. Endorsed by Shopify, Stripe, Visa, and 20+ partners. Enable AI agents to discover, checkout, and pay seamlessly."
                url="/trending/universal-commerce-protocol"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero */}
            <header className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <Link to="/trending" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="mb-8">
                        <Badge variant="outline" className="mb-4 text-green-400 border-green-400/30 py-1 px-3 text-xs">
                            🔥 NEW FROM GOOGLE
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400">
                                Universal Commerce Protocol
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                            The open-source standard powering the next generation of <strong className="text-white">agentic commerce</strong>.
                            Enable AI agents to discover products, checkout, and pay — all through a unified protocol.
                        </p>
                    </div>

                    {/* Partner Logos */}
                    <div className="mb-8">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">Endorsed by 20+ Partners</p>
                        <div className="flex flex-wrap gap-2">
                            {['Shopify', 'Google', 'Stripe', 'Visa', 'Mastercard', 'Adyen', 'Walmart', 'Target', 'Etsy', 'Wayfair'].map((name) => (
                                <PartnerLogo key={name} name={name} />
                            ))}
                            <div className="px-4 py-2 text-sm text-slate-500">+10 more</div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-3">
                        <a href="https://ucp.dev" target="_blank" rel="noopener noreferrer">
                            <Button variant="default" className="bg-cyan-600 hover:bg-cyan-500">
                                <Globe className="w-4 h-4 mr-2" />
                                ucp.dev
                            </Button>
                        </a>
                        <a href="https://github.com/universal-commerce-protocol/ucp" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-white/20">
                                <GitBranch className="w-4 h-4 mr-2" />
                                GitHub
                            </Button>
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pb-24 relative z-20">

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-12 p-1 bg-white/5 rounded-xl w-fit">
                    {[
                        { id: 'overview', label: 'Overview', icon: Layers },
                        { id: 'demo', label: 'Demo Implementation', icon: Play },
                        { id: 'integration', label: 'Google Integration', icon: Building2 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-16">

                        {/* What is UCP? */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">What is UCP?</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                UCP is an <strong className="text-white">open-source standard</strong> designed to power the next generation of agentic commerce.
                                By establishing a common language and functional primitives, UCP enables seamless commerce journeys between consumer surfaces,
                                businesses, and payment providers.
                            </p>

                            {/* Key Features */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <BenefitCard
                                    icon={Zap}
                                    title="Unified Integration"
                                    description="Collapses N×N complexity into a single integration point for all consumer surfaces."
                                    color="cyan"
                                />
                                <BenefitCard
                                    icon={Globe}
                                    title="Shared Language"
                                    description="Standardizes discovery, capability schema, and transport bindings for cross-platform interoperability."
                                    color="blue"
                                />
                                <BenefitCard
                                    icon={Layers}
                                    title="Extensible Architecture"
                                    description="Built with flexible capabilities and extensions framework that scales as new agentic experiences emerge."
                                    color="violet"
                                />
                                <BenefitCard
                                    icon={Shield}
                                    title="Security-First"
                                    description="Provides tokenized payments and verifiable credentials for secure agent-to-business communication."
                                    color="green"
                                />
                            </div>
                        </section>

                        {/* Who Benefits? */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Who Benefits?</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <BenefitCard
                                    icon={Store}
                                    title="For Businesses"
                                    description="Showcase products across AI surfaces like Google Search AI Mode and Gemini. You own your business logic and remain Merchant of Record."
                                    color="cyan"
                                />
                                <BenefitCard
                                    icon={Smartphone}
                                    title="For AI Platforms"
                                    description="Enable agentic shopping with standardized APIs. Support MCP, A2A, and existing agent frameworks."
                                    color="violet"
                                />
                                <BenefitCard
                                    icon={Code}
                                    title="For Developers"
                                    description="Open-source, community-driven. Build the next generation of digital commerce with us."
                                    color="green"
                                />
                                <BenefitCard
                                    icon={CreditCard}
                                    title="For Payment Providers"
                                    description="Modular payment handler design enables open interoperability. Every authorization is backed by cryptographic proof."
                                    color="blue"
                                />
                                <BenefitCard
                                    icon={Users}
                                    title="For Consumers"
                                    description="Shop your favorite brands with peace of mind. Get the best value including member benefits, with reduced friction."
                                    color="rose"
                                />
                            </div>
                        </section>

                        {/* Architecture Diagram */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Architecture Overview</h2>
                            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                                <div className="grid md:grid-cols-3 gap-8 text-center">
                                    {/* Consumer Surfaces */}
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                                            <Smartphone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                            <h4 className="font-bold text-white">Consumer Surfaces</h4>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">AI Mode in Search</div>
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">Gemini</div>
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">Third-party Agents</div>
                                        </div>
                                    </div>

                                    {/* UCP Layer */}
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/30">
                                            <Layers className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                                            <h4 className="font-bold text-white">UCP Layer</h4>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="px-3 py-2 rounded-lg bg-violet-500/10 text-sm text-violet-300 font-medium">Discovery</div>
                                            <div className="px-3 py-2 rounded-lg bg-violet-500/10 text-sm text-violet-300 font-medium">Capabilities</div>
                                            <div className="px-3 py-2 rounded-lg bg-violet-500/10 text-sm text-violet-300 font-medium">Payments</div>
                                        </div>
                                        <div className="flex justify-center gap-2">
                                            <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-500">REST</span>
                                            <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-500">MCP</span>
                                            <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-500">A2A</span>
                                        </div>
                                    </div>

                                    {/* Business Backends */}
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                            <Store className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                            <h4 className="font-bold text-white">Business Backends</h4>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">Product Catalog</div>
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">Checkout System</div>
                                            <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-slate-400">Order Management</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrows */}
                                <div className="flex justify-center items-center gap-4 mt-8">
                                    <ArrowRight className="w-6 h-6 text-slate-500" />
                                    <span className="text-sm text-slate-500">Standardized Communication via UCP</span>
                                    <ArrowRight className="w-6 h-6 text-slate-500" />
                                </div>
                            </div>
                        </section>

                        {/* Core Concepts */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Core Concepts</h2>

                            <h3 className="text-xl font-bold text-white mb-4">Capabilities</h3>
                            <p className="text-slate-400 mb-4">
                                Capabilities are core commerce building blocks that businesses expose to agents.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <CapabilityCard
                                    icon={ShoppingCart}
                                    name="dev.ucp.shopping.checkout"
                                    description="Handle cart, buyer info, and payment processing"
                                />
                                <CapabilityCard
                                    icon={Tag}
                                    name="dev.ucp.shopping.discount"
                                    description="Apply promo codes and member discounts"
                                    extends="checkout"
                                />
                                <CapabilityCard
                                    icon={Truck}
                                    name="dev.ucp.shopping.fulfillment"
                                    description="Shipping options and delivery tracking"
                                    extends="checkout"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">Payment Handlers</h3>
                            <p className="text-slate-400 mb-4">
                                UCP separates what consumers use to pay (instruments) from payment processors (handlers), allowing multiple payment options.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['Google Pay', 'Shop Pay', 'Apple Pay', 'Stripe', 'Adyen', 'Custom'].map((handler) => (
                                    <div key={handler} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-green-400" />
                                        {handler}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Discovery */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Discovery via /.well-known/ucp</h2>
                            <p className="text-slate-400 mb-4">
                                Businesses publish their services and capabilities in a standard JSON manifest. Agents dynamically discover features without hard-coded integrations.
                            </p>
                            <CodeBlock
                                title="Example: /.well-known/ucp manifest"
                                language="json"
                                code={`{
  "ucp": {
    "version": "2026-01-11",
    "services": {
      "dev.ucp.shopping": {
        "version": "2026-01-11",
        "spec": "https://ucp.dev/specs/shopping",
        "rest": {
          "endpoint": "https://api.yourstore.com/"
        }
      }
    },
    "capabilities": [
      {
        "name": "dev.ucp.shopping.checkout",
        "version": "2026-01-11",
        "spec": "https://ucp.dev/specs/shopping/checkout"
      },
      {
        "name": "dev.ucp.shopping.discount",
        "version": "2026-01-11",
        "extends": "dev.ucp.shopping.checkout"
      }
    ]
  },
  "payment": {
    "handlers": [
      { "id": "google_pay", "name": "google.pay" },
      { "id": "shop_pay", "name": "com.shopify.shop_pay" }
    ]
  }
}`}
                            />
                        </section>
                    </div>
                )}

                {/* DEMO TAB */}
                {activeTab === 'demo' && (
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">Demo: Flower Shop Implementation</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Let's walk through a complete UCP implementation for a demo flower shop,
                                showing how an agent can discover products, checkout, and apply discounts.
                            </p>

                            <div className="space-y-8">
                                <StepCard step={1} title="Set Up Business Server">
                                    <p className="mb-4">Clone the UCP samples repo and set up the Python server:</p>
                                    <CodeBlock
                                        title="Clone and setup"
                                        code={`# Clone UCP SDK and samples
mkdir sdk
git clone https://github.com/Universal-Commerce-Protocol/python-sdk.git sdk/python
cd sdk/python && uv sync && cd ../..

git clone https://github.com/Universal-Commerce-Protocol/samples.git
cd samples/rest/python/server
uv sync`}
                                    />
                                    <p className="mt-4 mb-4">Create local database with sample products:</p>
                                    <CodeBlock
                                        title="Import flower shop data"
                                        code={`mkdir /tmp/ucp_test
uv run import_csv.py \\
  --products_db_path=/tmp/ucp_test/products.db \\
  --transactions_db_path=/tmp/ucp_test/transactions.db \\
  --data_dir=../test_data/flower_shop`}
                                    />
                                </StepCard>

                                <StepCard step={2} title="Start the Business Server">
                                    <p className="mb-4">Launch the server to accept agent requests:</p>
                                    <CodeBlock
                                        title="Start server on port 8182"
                                        code={`uv run server.py \\
  --products_db_path=/tmp/ucp_test/products.db \\
  --transactions_db_path=/tmp/ucp_test/transactions.db \\
  --port=8182 &`}
                                    />
                                </StepCard>

                                <StepCard step={3} title="Agent Discovers Business Capabilities">
                                    <p className="mb-4">The agent fetches the UCP manifest to discover what the business supports:</p>
                                    <CodeBlock
                                        title="Discovery request"
                                        code={`curl -s -X GET http://localhost:8182/.well-known/ucp`}
                                    />
                                    <p className="mt-4 text-sm text-slate-500">
                                        Response includes services (shopping), capabilities (checkout, discount, fulfillment),
                                        and payment handlers (Google Pay, Shop Pay).
                                    </p>
                                </StepCard>

                                <StepCard step={4} title="Create Checkout Session">
                                    <p className="mb-4">Agent creates a checkout with line items and buyer info:</p>
                                    <CodeBlock
                                        title="Create checkout session"
                                        language="json"
                                        code={`POST /checkout-sessions

{
  "line_items": [
    {
      "item": { "id": "bouquet_roses", "title": "Red Rose" },
      "quantity": 1
    }
  ],
  "buyer": {
    "full_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "currency": "USD",
  "payment": {
    "handlers": [{ "id": "google_pay" }]
  }
}`}
                                    />
                                    <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <p className="text-sm text-green-300">
                                            <strong>Response:</strong> Checkout session created with id <code>cb9c0fc5-3e81-...</code>,
                                            status <code>ready_for_complete</code>, total: <strong>$35.00</strong>
                                        </p>
                                    </div>
                                </StepCard>

                                <StepCard step={5} title="Apply Discount Code">
                                    <p className="mb-4">Agent applies a promo code to the checkout:</p>
                                    <CodeBlock
                                        title="Apply 10% discount"
                                        language="json"
                                        code={`PUT /checkout-sessions/{checkout_id}

{
  "discounts": {
    "codes": ["10OFF"]
  }
}`}
                                    />
                                    <div className="mt-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                                        <p className="text-sm text-cyan-300">
                                            <strong>Result:</strong> Discount applied! Subtotal: $35.00, Discount: -$3.50,
                                            <strong> New Total: $31.50</strong>
                                        </p>
                                    </div>
                                </StepCard>
                            </div>

                            {/* Resources */}
                            <div className="mt-12 p-6 rounded-xl bg-slate-900/50 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-cyan-400" />
                                    Try It Yourself
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <a
                                        href="https://github.com/Universal-Commerce-Protocol/samples"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                    >
                                        <GitBranch className="w-5 h-5 text-violet-400" />
                                        <div>
                                            <div className="font-medium text-white">UCP Samples</div>
                                            <div className="text-xs text-slate-500">Python server & client examples</div>
                                        </div>
                                    </a>
                                    <a
                                        href="https://github.com/Universal-Commerce-Protocol/python-sdk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                    >
                                        <Code className="w-5 h-5 text-green-400" />
                                        <div>
                                            <div className="font-medium text-white">Python SDK</div>
                                            <div className="text-xs text-slate-500">Official UCP SDK for Python</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* INTEGRATION TAB */}
                {activeTab === 'integration' && (
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">Integrate with Google</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Google has built the first reference implementation of UCP, powering checkout directly within
                                AI Mode in Search and Gemini. Consumers can purchase using Google Pay with stored payment info.
                            </p>

                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-8 mb-8">
                                <h3 className="text-xl font-bold text-white mb-4">Example Query in AI Mode</h3>
                                <div className="p-4 rounded-lg bg-black/40">
                                    <p className="text-lg text-slate-300 italic">
                                        "Find a light-weight suitcase for an upcoming trip."
                                    </p>
                                </div>
                                <p className="text-sm text-slate-400 mt-4">
                                    → AI discovers UCP-enabled retailers → Shows products with prices → User checks out with Google Pay
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">Integration Steps</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-white">Set Up Merchant Center Account</h4>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Create an active <a href="https://merchants.google.com" className="text-cyan-400 hover:underline" target="_blank">Merchant Center account</a> and
                                            provide products eligible for checkout.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-white">Complete Merchant Interest Form</h4>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Read the <a href="https://developers.google.com/merchant/ucp" className="text-cyan-400 hover:underline" target="_blank">Google integration guide</a> and
                                            express interest to participate.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-white">Implement UCP Checkout</h4>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Follow the <a href="https://developers.google.com/merchant/ucp/guides/checkout" className="text-cyan-400 hover:underline" target="_blank">checkout integration guide</a> to
                                            implement UCP on your backend.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Resources */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Resources</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a
                                    href="https://ucp.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                                        <Globe className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">UCP Specification</h4>
                                        <p className="text-xs text-slate-500">ucp.dev</p>
                                    </div>
                                </a>
                                <a
                                    href="https://github.com/universal-commerce-protocol/ucp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="p-3 bg-violet-500/10 rounded-lg">
                                        <GitBranch className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">GitHub Repository</h4>
                                        <p className="text-xs text-slate-500">Open-source specification</p>
                                    </div>
                                </a>
                                <a
                                    href="https://developers.google.com/merchant/ucp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="p-3 bg-blue-500/10 rounded-lg">
                                        <Building2 className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Google Merchant Docs</h4>
                                        <p className="text-xs text-slate-500">Integration guide</p>
                                    </div>
                                </a>
                                <a
                                    href="https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="p-3 bg-green-500/10 rounded-lg">
                                        <ExternalLink className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Original Blog Post</h4>
                                        <p className="text-xs text-slate-500">Google Developers Blog</p>
                                    </div>
                                </a>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20">
                            <h3 className="text-2xl font-bold text-white mb-4">Join the Future of Commerce</h3>
                            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                                UCP is open-source and community-driven. Explore the specification,
                                participate in GitHub Discussions, and contribute through pull requests.
                            </p>
                            <a href="https://github.com/universal-commerce-protocol/ucp" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-cyan-600 hover:bg-cyan-500">
                                    <GitBranch className="w-4 h-4 mr-2" />
                                    Contribute on GitHub
                                </Button>
                            </a>
                        </section>
                    </div>
                )}

                {/* Back CTA */}
                <div className="text-center pt-12 mt-12 border-t border-white/10">
                    <Link to="/trending">
                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trending
                        </Button>
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
