export interface FAQ {
  id: string;
  category: 'Company' | 'Product & Pricing' | 'Integration & Technical' | 'Implementation' | 'Compliance & Operations';
  question: string;
  answer: string;
  typically_asked_by: string[];
  related_signal_ids?: string[];
}

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    category: 'Company',
    question: 'Who are your customers?',
    answer: 'We work with over 1,000 merchants across a wide range of industries including skincare (Dermstore, Shiseido), fitness equipment (NordicTrack, ProForm), supplements (Amy Myers MD), red light therapy and other health and wellness categories.',
    typically_asked_by: ['Finance/Operations Executive', 'Technical Founder/Decision Maker'],
    related_signal_ids: ['signal-faq-001'],
  },
  {
    id: 'faq-002',
    category: 'Implementation',
    question: 'What support and documentation resources are available to us?',
    answer: 'We have comprehensive support resources available throughout your journey with Flex. You\'ll have access to our support team via email at support@withflex.com, our shared Slack channels for quick back-and-forth questions, and extensive documentation covering integration, compliance, and operational best practices.',
    typically_asked_by: ['Technical Implementation Lead', 'Operations/Implementation Manager'],
    related_signal_ids: ['signal-faq-002'],
  },
  {
    id: 'faq-003',
    category: 'Integration & Technical',
    question: 'What level of technical development is required to integrate with your platform?',
    answer: 'We support API integrations for custom platforms and native integrations for Shopify and WooCommerce that require minimal to no development work. For Shopify, you simply install our app and enable the payment option at checkout. For custom platforms, our API documentation and sandbox environment make integration straightforward for experienced developers.',
    typically_asked_by: ['Technical Implementation Lead'],
    related_signal_ids: ['signal-faq-003'],
  },
  {
    id: 'faq-004',
    category: 'Implementation',
    question: 'What are the next steps to get set up after we decide to move forward?',
    answer: 'After signing the contract, you\'ll set up a Stripe Connect account (takes about 5-10 minutes) to provide your banking information for fund deposits. Then we schedule a 30-minute implementation call where we discuss your specific setup requirements, integration timeline, and address any questions about the integration process.',
    typically_asked_by: ['Operations/Implementation Manager'],
    related_signal_ids: ['signal-faq-002'],
  },
  {
    id: 'faq-005',
    category: 'Implementation',
    question: 'What kind of dashboard, interfaces, and resources do you provide for integration?',
    answer: 'We provide a comprehensive set of resources and interfaces for integration. You\'ll have access to our dashboard for managing orders and analytics, marketing assets including badges and logos, API documentation with code examples, and integration guides tailored to your platform. We also provide training materials for your team and ongoing support during and after launch.',
    typically_asked_by: ['Operations/Implementation Manager', 'Technical Implementation Lead'],
  },
  {
    id: 'faq-006',
    category: 'Implementation',
    question: 'How long does implementation take from signing to going live?',
    answer: 'Implementation is very quick—typically 24-48 hours to a few days depending on your platform. For Shopify merchants, we have a native app integration, so you can be live within a day or even by end of business the same day. For custom platforms, timeline depends on your development resources but API integration is designed to be fast with comprehensive documentation and our technical team\'s support.',
    typically_asked_by: ['Technical Founder/Decision Maker', 'Operations/Implementation Manager'],
  },
  {
    id: 'faq-007',
    category: 'Product & Pricing',
    question: 'How does the payment processing fee work with mixed carts?',
    answer: 'Flex is the payment processor for HSA/FSA transactions. We handle the entire payment, including both eligible and ineligible items if there\'s a mixed cart. Our transaction fee of 5% plus $0.30 applies to the total transaction amount. This transparent pricing model means you know exactly what you\'re paying regardless of cart composition.',
    typically_asked_by: ['Finance/Operations Executive', 'Technical Founder/Decision Maker'],
    related_signal_ids: ['signal-faq-001'],
  },
  {
    id: 'faq-008',
    category: 'Compliance & Operations',
    question: 'How does Flex handle payment processing and payouts to merchants?',
    answer: 'We act as the payment processor for HSA/FSA transactions. When a customer completes a purchase, we process the payment, deduct our transaction fee (5% + $0.30), and deposit the remaining funds to your Stripe Connect account. Payouts are typically processed within 1-2 business days, and you can view real-time transaction data in your dashboard.',
    typically_asked_by: ['Technical Implementation Lead', 'Finance/Operations Executive'],
  },
  {
    id: 'faq-009',
    category: 'Compliance & Operations',
    question: 'What products are eligible for HSA/FSA, and how is eligibility determined?',
    answer: 'We handle product eligibility determination for you through our internal compliance team. During implementation, we review your entire product catalog and categorize each SKU into three buckets: always-eligible (automatic approval), dual-use (requires medical necessity letter), and ineligible. We update eligibility determinations as needed and provide ongoing support for new product additions.',
    typically_asked_by: ['Technical Founder/Decision Maker', 'Finance/Operations Executive'],
    related_signal_ids: ['signal-faq-003'],
  },
  {
    id: 'faq-010',
    category: 'Compliance & Operations',
    question: 'How do refunds and returns work when customers pay with HSA/FSA cards?',
    answer: 'When customers pay with their HSA/FSA card through Flex, the transaction and payment are processed immediately at checkout. If a customer requests a return or refund, you handle it exactly as you normally would—issuing a refund to the card. The refund is processed through the same HSA/FSA account, ensuring a seamless experience for the customer.',
    typically_asked_by: ['Operations/Implementation Manager', 'Finance/Operations Executive'],
  },
  {
    id: 'faq-011',
    category: 'Product & Pricing',
    question: 'What are the conversion rates for customers using HSA/FSA payments, and does requiring medical necessity impact conversions?',
    answer: 'Flex\'s conversion rates are consistently strong across both always-eligible products (automatic approval) and dual-use products (requiring a medical questionnaire). We see a combined 30% increase in conversion rates when HSA/FSA payment options are available. The streamlined medical necessity letter process minimizes friction while maintaining compliance.',
    typically_asked_by: ['Marketing/Growth Leader', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'faq-012',
    category: 'Compliance & Operations',
    question: 'How does the letter of medical necessity process work?',
    answer: 'We issue letters of medical necessity directly at checkout through our network of telehealth providers. Customers complete a 60-second chat-based survey selecting from pre-approved conditions for your products. Approved customers immediately receive their letter and can complete the purchase with their HSA/FSA card. This happens in real-time without delays.',
    typically_asked_by: ['Technical Founder/Decision Maker', 'Operations/Implementation Manager'],
  },
  {
    id: 'faq-013',
    category: 'Integration & Technical',
    question: 'What platforms and payment processors do you integrate with?',
    answer: 'We have native integrations with Shopify and WooCommerce that work as plug-and-play apps—we hop on a call, turn the checkout on, and you\'re live. For Stripe and other custom checkouts, we offer an API that integrates with your existing payment processing flow. We\'re constantly expanding our integration library based on merchant needs.',
    typically_asked_by: ['Technical Implementation Lead'],
  },
  {
    id: 'faq-014',
    category: 'Product & Pricing',
    question: 'How does Flex\'s marketplace work, and what kind of traffic and visibility can we expect?',
    answer: 'Flex has a marketplace that receives over 500,000 visitors per month—high-intent shoppers actively searching for HSA/FSA-eligible products. All merchants who partner with Flex are automatically listed for free. Your products appear in marketplace search results, category listings, and recommendations, driving significant organic traffic.',
    typically_asked_by: ['Marketing/Growth Leader', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'faq-015',
    category: 'Company',
    question: 'What is Flex and how long has the company been around?',
    answer: 'Flex (withflex.com) is a Y Combinator-backed fintech company that\'s been around for about 2-3 years, founded by Miguel and Sam. We\'re a venture-backed, post-Series A startup based in San Francisco with a growing team. We\'re backed by leading venture firms and experienced operators in fintech and e-commerce.',
    typically_asked_by: ['Technical Founder/Decision Maker'],
  },
  {
    id: 'faq-016',
    category: 'Product & Pricing',
    question: 'What is your pricing model and how much does it cost?',
    answer: 'Our pricing is fully consumption-based with no onboarding fees, monthly fees, or setup costs. You pay 5% + $0.30 per HSA/FSA transaction processed through Flex. This means you only pay for the value you get, and costs scale with your business. We believe transparent, consumption-based pricing aligns our success with yours.',
    typically_asked_by: ['Finance/Operations Executive', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'faq-017',
    category: 'Integration & Technical',
    question: 'How does your checkout process work for customers?',
    answer: 'We integrate as a third-party payment option at checkout, similar to PayPal or Shop Pay. Customers select Flex as their payment method, are prompted to enter or authenticate their HSA/FSA card details, and complete the transaction instantly. The entire process takes seconds and feels native to your checkout experience.',
    typically_asked_by: ['Operations/Implementation Manager', 'Marketing/Growth Leader', 'Technical Founder/Decision Maker'],
  },
];
