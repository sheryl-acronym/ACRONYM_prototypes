import { DealDetailData } from '@/types';

export const dealDetailDemoData: Record<string, DealDetailData> = {
  'deal-005': {
    name: 'Deal with proven.com',
    icon_color: 'bg-blue-200',
    stage_name: 'Demo',
    status: 'in_progress',
    momentum: 'Active',
    last_meeting: '2026-01-06',
    next_meeting: null,
    owner_name: 'Jacob Francis',
    company_name: 'PROVEN Skincare',
    company_icon_color: 'bg-violet-200',
    company_logo_url: 'https://logo.clearbit.com/provenskincare.com',
    customer_profile: 'Customer Profile Name',
    overview: {
      momentum_summary: '🔵 Active - Deal is active with high quality discovery. Russell confirmed product eligibility and provided critical $15M ARR data to model the ROI, though margin concerns regarding fees need to be resolved in next week\'s pricing review.',
      last_meeting: {
        title: 'Demo and pricing review with Russell Harris (Head of Product/Tech), Theresa Bischof (Brand), and Yuliia Pyrohova (Tech)',
        bullets: [
          'Critical Blocker Identified - Confirmed inability to process direct HSA/FSA payments for Skio subscriptions; requires high-friction reimbursement flow which Russell labeled a potential "deal killer"',
          'Pricing Presented - Enterprise terms introduced (4.5% + $0.30 transaction + $8 LMN); Russell taking ownership of ROI modeling to validate margin impact',
          'Technical Validation - Confirmed 95% catalog eligibility and "Hidden SKU" mapping solution via "Family of Products" logic',
          'Next Steps - Russell to conduct internal feasibility review Tuesday to decide if acquisition lift outweighs subscription friction',
        ],
      },
      positive_signals: [
        {
          label: 'Stakeholder Expansion',
          description:
            'Theresa Bischof (Brand) and Yuliia Pyrohova (Tech) joined the evaluation, indicating serious intent to vet implementation details',
        },
        {
          label: 'Champion Ownership',
          description:
            'Russell Harris explicitly requested the raw ROI model to "do the math" personally, demonstrating active engagement in building the business case',
        },
        {
          label: 'Technical Validation',
          description:
            'Confirmed 95% of catalog (including personalized formulas) is eligible, resolving initial architecture concerns',
        },
        {
          label: 'Data Transparency',
          description:
            'Russell shared granular metrics ($1.25M/mo revenue, 10k orders) to ensure accurate modeling',
        },
      ],
      risk_factors: [
        {
          label: 'Subscription Incompatibility - High Impact',
          description:
            'Inability to process direct HSA/FSA for Skio orders forces a reimbursement flow; Russell flagged this as a potential "complete killer" for their LTV strategy',
        },
        {
          label: 'User Experience Friction',
          description:
            'Post-purchase reimbursement requirement for subscribers contradicts the "Pay with HSA" promise, potentially degrading customer experience',
        },
        {
          label: 'Unit Economics',
          description:
            'Stacking fees (4.5% + $8 LMN) require significant conversion lift to remain margin-positive against low-cost status quo',
        },
        {
          label: 'Cannibalization Concern',
          description:
            'Fear that HSA/FSA options might cannibalize existing full-price sales rather than driving net-new volume',
        },
      ],
      next_steps: [
        {
          text: 'Send ROI model and three case studies of similar conversion lift examples',
          due_date: '',
          assignee: 'Jacob Francis (Flex)',
          completed: false,
          reasoning: {
            text: 'Russell explicitly requested the ROI model to "do the math" personally and indicated he needs conversion lift case studies to justify the margin impact to his team.',
            verbatims: [
              { quote: 'I want to run this through our unit economics model', timestamp: '00:12:38' },
            ],
          },
        },
        {
          text: 'Review ROI model and calculate internal unit economics',
          due_date: '',
          assignee: 'Russell Harris (PROVEN)',
          completed: false,
          reasoning: {
            text: 'This is Russell\'s stated next step to validate if the acquisition lift outweighs the cost of the HSA/FSA subscription workaround and fee stack.',
            verbatims: [
              { quote: 'I need to see if the numbers make sense with our existing margin targets', timestamp: '00:19:27' },
            ],
          },
        },
        {
          text: 'Schedule internal team discussion to review feasibility for Tuesday',
          due_date: '',
          assignee: 'Russell Harris (PROVEN)',
          completed: false,
          reasoning: {
            text: 'Russell is taking ownership of the internal alignment required before moving forward. The subscription payment workaround needs internal buy-in from his team.',
          },
        },
        {
          text: 'Provide FAQ templates and marketing copy for Theresa Bischof',
          due_date: '',
          assignee: 'Jacob Francis (Flex)',
          completed: false,
          reasoning: {
            text: 'Theresa\'s involvement signals serious intent to vet implementation details and prepare customer-facing materials, which is a positive signal of deal progress.',
            verbatims: [
              { quote: 'We\'ll need clear messaging on how this works for our customers', timestamp: '00:24:55' },
            ],
          },
        },
      ],
    },
    opportunity_summary: {
      headline: 'Proven Skincare: AI-powered personalized care manufacturer, ~$15M ARR ($1.25M/mo), scaling via Shopify and Skio.',
      what_they_want: [
        {
          text: 'Unlock HSA/FSA spending to increase conversion rates and Average Order Value (AOV).',
          reasoning: {
            text: 'HSA/FSA payments are a significant untapped revenue channel for premium skincare. Enabling this payment method directly addresses customer acquisition friction.',
            verbatims: [
              { quote: 'We want to tap into the HSA/FSA market to drive higher AOV', timestamp: '00:05:12' },
            ],
          },
        },
        {
          text: 'Seamless integration that handles complex "hidden SKU" architecture for personalized formulas.',
          reasoning: {
            text: 'Their personalization engine creates thousands of SKUs that are difficult for standard integrations to handle. A seamless integration that maps these hidden SKUs is a key requirement.',
          },
        },
      ],
      how_we_help: [
        {
          text: '95% eligibility coverage validated for their catalog, including personalized routines.',
          reasoning: {
            text: 'Our eligibility validation covers their entire product catalog, including custom personalized formulas, which is critical for their business model.',
          },
        },
        {
          text: '"Doctors appointment in checkout" UX to drive conversion without disrupting the user journey.',
          reasoning: {
            text: 'This proprietary UX pattern has proven to increase conversion rates without adding friction. It directly addresses their need for a frictionless customer experience.',
            verbatims: [
              { quote: 'We need a solution that doesn\'t disrupt our customer checkout flow', timestamp: '00:18:33' },
            ],
          },
        },
        {
          text: 'Workaround for Skio subscriptions via reimbursement flow (though currently a point of friction).',
          reasoning: {
            text: 'While not ideal, our reimbursement flow workaround allows them to unlock HSA/FSA for subscriptions. This is a temporary solution that buys time for a native integration.',
          },
        },
      ],
      why_now: [
        {
          text: 'Strategic focus on margin preservation and profitability; Russell is actively evaluating unit economics.',
          reasoning: {
            text: 'Russell has made it clear that unit economics are the primary evaluation criteria. This is the right time to present a clear ROI model.',
            verbatims: [
              { quote: 'We\'re focused on margin expansion, not just top-line growth', timestamp: '00:08:45' },
            ],
          },
        },
        {
          text: 'Immediate interest in capturing "conversion lift" revenue to offset processing fees.',
          reasoning: {
            text: 'They understand that HSA/FSA customers represent new volume. If we can prove meaningful conversion lift, the transaction fees become a net positive investment.',
            verbatims: [
              { quote: 'We need to see real conversion lift numbers to justify the fees to our finance team', timestamp: '00:14:20' },
            ],
          },
        },
      ],
      budget_and_roi: [
        {
          text: 'Enterprise pricing presented: 4.5% + $0.30/trans + $8.00/LMN.',
          reasoning: {
            text: 'Enterprise terms reflect their $15M ARR scale and the complexity of handling personalized products. This pricing positions us as a strategic partner, not a commodity processor.',
          },
        },
        {
          text: 'ROI projected at 6.38x based on 50% AOV uplift.',
          reasoning: {
            text: 'Conservative ROI projection assuming 50% AOV uplift. This represents a 6.38x return on the transaction fees, making a compelling business case.',
          },
        },
        {
          text: 'Deal hinges on Russell\'s internal modeling proving that acquisition lift outweighs the cost of the subscription workaround.',
          reasoning: {
            text: 'This is the critical blocker. Russell needs to validate internally that HSA/FSA volume justifies the reimbursement friction for subscriptions. Our case studies and ROI model are key to this decision.',
            verbatims: [
              { quote: 'I need to prove to the team that this lift justifies the complexity', timestamp: '00:22:15' },
            ],
          },
        },
      ],
    },
    key_stakeholders: [
      {
        name: 'Russell Harris',
        avatar_color: 'bg-orange-400',
        buyer_persona: 'Technical Founder/Decision Maker',
        role_in_buying_process: 'Champion',
      },
    ],
  },
};
