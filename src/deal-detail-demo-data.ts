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
    customer_profile: 'Mid-Market E-Commerce',
    overview: {
      momentum_summary: 'Deal is active with high quality discovery. Russell confirmed product eligibility and provided critical $15M ARR data to model the ROI, though margin concerns regarding fees need to be resolved in next week\'s pricing review.',
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
    intel: {
      sections: [
        {
          title: 'Business Context',
          items: [
            {
              text: 'Revenue: $15M ARR ($1.25M/mo), processing ~10,000 monthly orders.',
              reasoning: {
                text: 'This scale indicates a mature e-commerce operation with significant volume. At ~1.5K orders/mo, the unit economics of HSA/FSA integration are meaningful.',
                verbatims: [
                  { quote: 'We do about $1.25M a month in revenue, processing roughly 10,000 orders', timestamp: '00:03:22' },
                ],
              },
            },
            {
              text: 'Model: High focus on subscription recurring revenue (Skio) to drive CLTV.',
              reasoning: {
                text: 'Subscriptions are critical to their unit economics. Any friction in the subscription payment flow directly impacts lifetime value and retention.',
                verbatims: [
                  { quote: 'Our entire growth strategy depends on improving subscription retention and LTV', timestamp: '00:06:15' },
                ],
              },
            },
            {
              text: 'Metrics: $108 blended AOV; recurring customers higher at $131 AOV.',
              reasoning: {
                text: 'The 21% AOV premium for recurring customers shows the value of their subscription model. HSA/FSA could unlock new subscription tiers.',
                verbatims: [
                  { quote: 'Our blended AOV is $108, but subscribers average $131—that\'s where the real margin is', timestamp: '00:07:30' },
                ],
              },
            },
          ],
        },
        {
          title: 'Technical Environment',
          items: [
            {
              text: 'Platform: Shopify + Skio for subscriptions.',
              reasoning: {
                text: 'Shopify is a standard ecommerce platform with mature API integrations. Skio is a specialized subscription platform that may have limitations for alternative payment methods.',
                verbatims: [
                  { quote: 'We run on Shopify with Skio for our subscription engine', timestamp: '00:09:45' },
                ],
              },
            },
            {
              text: 'Critical Constraint: Cannot process direct HSA/FSA payments for Skio orders; must use post-purchase reimbursement flow.',
              reasoning: {
                text: 'This is the deal blocker. Russell sees this as a "potential deal killer" because it breaks the subscription UX and creates customer friction.',
                verbatims: [
                  { quote: 'Skio can\'t process HSA/FSA directly on subscriptions—that\'s a deal killer for us', timestamp: '00:12:05' },
                ],
              },
            },
            {
              text: 'Architecture: "Hidden SKU" personalized products map via "Family of Products" logic (verified).',
              reasoning: {
                text: 'We\'ve confirmed their technical architecture can support our integration. This removes a major implementation risk.',
                verbatims: [
                  { quote: 'Our personalization engine creates thousands of SKUs, but the Family of Products mapping should work with your system', timestamp: '00:15:40' },
                ],
              },
            },
          ],
        },
        {
          title: 'Competitive Landscape',
          items: [
            {
              text: 'Status Quo: Shopify Payments (Standard Credit/Debit).',
              reasoning: {
                text: 'They currently have a working payment system. The bar for switching is high—we need to prove clear ROI.',
                verbatims: [
                  { quote: 'Right now we just use standard Shopify Payments for everything', timestamp: '00:04:30' },
                ],
              },
            },
            {
              text: 'Competitor: "Do Nothing" is the primary threat due to the friction introduced to the subscription flow.',
              reasoning: {
                text: 'The reimbursement workaround creates enough friction that they may decide to forego HSA/FSA entirely rather than degrade subscription experience.',
                verbatims: [
                  { quote: 'If there\'s too much friction, we\'ll just skip HSA/FSA and focus on what we\'re already doing', timestamp: '00:20:10' },
                ],
              },
            },
            {
              text: 'No direct HSA/FSA competitors mentioned.',
              reasoning: {
                text: 'This is a greenfield opportunity. Russell hasn\'t mentioned evaluating alternative HSA/FSA processors, suggesting they\'re evaluating us on our merits.',
                verbatims: [
                  { quote: 'You\'re the first HSA/FSA provider we\'ve seriously looked at', timestamp: '00:02:50' },
                ],
              },
            },
          ],
        },
        {
          title: 'Timeline & Urgency',
          items: [
            {
              text: 'Immediate evaluation: Internal team review scheduled for Tuesday.',
              reasoning: {
                text: 'This is a near-term decision point. Russell is personally driving the internal review, indicating executive priority.',
                verbatims: [
                  { quote: 'We\'re scheduling an internal alignment meeting for Tuesday to make a decision', timestamp: '00:28:15' },
                ],
              },
            },
            {
              text: 'Driver: Russell\'s internal optimization roadmap; no external compelling event (e.g., fiscal year end).',
              reasoning: {
                text: 'This is self-initiated optimization, not crisis-driven. It\'s a lower-urgency deal that could slip if the math doesn\'t work.',
                verbatims: [
                  { quote: 'This is part of our Q1 optimization roadmap, not a must-have', timestamp: '00:26:45' },
                ],
              },
            },
          ],
        },
        {
          title: 'Commercial Terms',
          items: [
            {
              text: 'Proposal: 4.5% + $0.30 transaction fee + $8.00 per Letter of Medical Necessity (LMN).',
              reasoning: {
                text: 'Enterprise pricing reflects their $15M ARR scale. At 10k orders/mo, this is ~$0.80/order in fixed fees alone.',
                verbatims: [
                  { quote: 'So you\'re looking at 4.5% plus $0.30 per transaction and $8 per LMN', timestamp: '00:17:22' },
                ],
              },
            },
            {
              text: 'LMN Terms: Valid for 12 months, covering reorders.',
              reasoning: {
                text: 'This is favorable for recurring customers on subscriptions—one LMN covers all future orders in the 12-month window.',
                verbatims: [
                  { quote: 'One LMN good for a year across all orders is actually pretty clean for subscriptions', timestamp: '00:18:05' },
                ],
              },
            },
            {
              text: 'Requirement: Net margin impact must be positive after fees.',
              reasoning: {
                text: 'Russell is explicit: fees must be offset by conversion lift. This is non-negotiable for their margin targets.',
                verbatims: [
                  { quote: 'We need to see net margin improvement, not just revenue', timestamp: '00:19:50' },
                ],
              },
            },
          ],
        },
        {
          title: 'Decision Dynamics',
          items: [
            {
              text: 'Economic Buyer: Russell Harris (Head of Product/Tech) is driving the decision and financial modeling.',
              reasoning: {
                text: 'Russell is the decision-maker and will personally validate the ROI. This is a technical founder who thinks in unit economics.',
                verbatims: [
                  { quote: 'I\'ll need to validate this through our unit economics model before we move forward', timestamp: '00:21:30' },
                ],
              },
            },
            {
              text: 'Stakeholders: Theresa Bischof (Brand) and Yuliia Pyrohova (Tech) involved in vetting.',
              reasoning: {
                text: 'Their involvement signals serious intent. Theresa is prepping customer-facing copy, and Yuliia is vetting technical feasibility.',
                verbatims: [
                  { quote: 'Theresa will need to review how this works from a brand perspective, and Yuliia will validate the technical integration', timestamp: '00:23:10' },
                ],
              },
            },
            {
              text: 'Process: Russell acts as the gatekeeper; if the math works, they likely proceed.',
              reasoning: {
                text: 'This is a bottleneck decision. If Russell validates the ROI model positively, the other stakeholders will likely follow.',
                verbatims: [
                  { quote: 'If I can make the numbers work, we\'ll move forward quickly', timestamp: '00:27:45' },
                ],
              },
            },
          ],
        },
        {
          title: 'Relationship Intelligence',
          items: [
            {
              text: 'Champion Style: Russell is direct, skeptical, and analytical ("do the math").',
              reasoning: {
                text: 'Russell wants to "run this through our unit economics model" personally. He\'s not going to be sold on vision—only numbers.',
                verbatims: [
                  { quote: 'I want to run this through our unit economics model myself', timestamp: '00:12:38' },
                ],
              },
            },
            {
              text: 'Sentiment: Russell is "bummed" by the subscription limitation but remains engaged to see if the acquisition lift compensates for it.',
              reasoning: {
                text: 'Despite the friction concern, Russell hasn\'t walked away. He\'s willing to move forward if the math works. The deal is salvageable.',
                verbatims: [
                  { quote: 'I\'m bummed about the subscription friction, but if the conversion lift is real, we might make it work', timestamp: '00:25:15' },
                ],
              },
            },
          ],
        },
      ],
    },
    meddic: {
      components: [
        {
          name: 'Metrics',
          status: 'complete',
          information: '~$1.25M/mo revenue, 4.5% fee + $8 LMN',
          details: [
            {
              text: 'Revenue Base: ~$1.25M monthly revenue',
              reasoning: {
                text: 'Russell Harris provided specific financial metrics to model the ROI. This is a significant volume that makes the transaction fees economically meaningful.',
                verbatims: [
                  { quote: 'We do about $1.25M a month in revenue, processing roughly 10,000 orders', timestamp: '00:03:22' },
                ],
              },
            },
            {
              text: 'Pricing: 4.5% + $0.30 transaction + $8 LMN',
              reasoning: {
                text: 'Russell is actively calculating the break-even point between these fees and the projected conversion lift. The deal hinges entirely on whether his internal modeling validates the 6.38x ROI projection.',
                verbatims: [
                  { quote: 'So you\'re looking at 4.5% plus $0.30 per transaction and $8 per LMN', timestamp: '00:17:22' },
                ],
              },
            },
          ],
        },
        {
          name: 'Economic Buyer',
          status: 'complete',
          information: 'Russell Harris (Head of Product/Tech)',
          details: [
            {
              text: 'Russell Harris confirmed as decision-maker driving the evaluation',
              reasoning: {
                text: 'He invited the team, explicitly stated he will "do the math" to make the decision, and is personally building the ROI model.',
                verbatims: [
                  { quote: 'If you can send me the specifics around costs... I would like to compare costs to expected conversion', timestamp: '00:21:30' },
                ],
              },
            },
          ],
        },
        {
          name: 'Decision Process',
          status: 'partial',
          information: 'Internal review Tuesday; signature steps unknown',
          details: [
            {
              text: 'Known: Russell Harris will review ROI model and hold internal team discussion on Tuesday',
              reasoning: {
                text: 'This is the critical near-term decision point. Russell is personally driving the internal alignment.',
                verbatims: [
                  { quote: 'We\'re scheduling an internal alignment meeting for Tuesday to make a decision', timestamp: '00:28:15' },
                ],
              },
            },
            {
              text: 'Gap: Unknown if legal or finance (CFO) needs to sign off on contract after Russell approves',
              reasoning: {
                text: 'We have visibility to the decision-maker but not full visibility into the approval workflow beyond Russell\'s sign-off.',
              },
            },
          ],
        },
        {
          name: 'Decision Criteria',
          status: 'complete',
          information: 'Net Margin > Fees; Subscription UX friction',
          details: [
            {
              text: 'Financial: Incremental revenue must exceed transaction and medical letter fees',
              reasoning: {
                text: 'Russell is explicit that fees must be offset by conversion lift. This is non-negotiable for their margin targets.',
                verbatims: [
                  { quote: 'We need to see net margin improvement, not just revenue', timestamp: '00:19:50' },
                ],
              },
            },
            {
              text: 'User Experience: Reimbursement flow friction for Skio subscriptions is a new critical negative criterion',
              reasoning: {
                text: 'PROVEN must decide if the post-purchase reimbursement workaround is an acceptable compromise for their subscription customers.',
                verbatims: [
                  { quote: 'The subscription friction is a complete killer for our LTV strategy', timestamp: '00:19:15' },
                ],
              },
            },
            {
              text: 'Architecture: Must support "Hidden SKU" logic (Verified)',
              reasoning: {
                text: 'Technical validation removed this as a blocker. Their personalized product architecture is compatible with our integration.',
              },
            },
          ],
        },
        {
          name: 'Decision Maker',
          status: 'complete',
          information: 'Russell Harris (implied authority)',
          details: [
            {
              text: 'Russell Harris appears to have authority to say yes or no based on technical and economic fit',
              reasoning: {
                text: 'As Head of Product/Tech and founder-level role, Russell has the authority to make this decision. His team defers to his analysis.',
              },
            },
          ],
        },
        {
          name: 'Identify Pain',
          status: 'complete',
          information: 'Conversion lift; "cannibalization" vs new growth',
          details: [
            {
              text: 'Primary Pain: Need to increase conversion rates and AOV',
              reasoning: {
                text: 'HSA/FSA spending is an untapped revenue channel for premium skincare. Russell explicitly sees this as a lever for growth.',
                verbatims: [
                  { quote: 'We want to tap into the HSA/FSA market to drive higher AOV', timestamp: '00:05:12' },
                ],
              },
            },
            {
              text: 'Secondary Pain: Concern about cannibalizing full-price sales without net-new volume',
              reasoning: {
                text: 'Russell is worried that HSA/FSA will shift existing customers from full-price to discounted path, rather than attracting truly new volume.',
                verbatims: [
                  { quote: 'We need to see real conversion lift numbers to justify the fees to our finance team', timestamp: '00:14:20' },
                ],
              },
            },
          ],
        },
        {
          name: 'Champion',
          status: 'partial',
          information: 'Russell Harris (Self-championing)',
          details: [
            {
              text: 'Russell is self-championing: drove the meeting, brought the team, investigating the opportunity',
              reasoning: {
                text: 'Russell is the primary driver. However, he is also the primary skeptic regarding the subscription limitation.',
              },
            },
            {
              text: 'Gap: Flex lacks internal advocate who can "sell" the reimbursement workaround if Russell has doubts',
              reasoning: {
                text: 'Theresa and Yuliia are evaluating but not championing. If Russell decides the subscription friction is too much, there\'s no internal counterargument prepared.',
              },
            },
          ],
        },
        {
          name: 'Competition',
          status: 'complete',
          information: 'Status Quo (Shopify Payments)',
          details: [
            {
              text: 'Status Quo: Shopify Payments (Standard Credit/Debit)',
              reasoning: {
                text: 'They currently have a working payment system. The primary competition is "do nothing" rather than another vendor.',
                verbatims: [
                  { quote: 'Right now we just use standard Shopify Payments for everything', timestamp: '00:04:30' },
                ],
              },
            },
            {
              text: 'Barrier: Low cost of status quo vs premium cost of HSA/FSA integration',
              reasoning: {
                text: 'No other HSA/FSA vendors mentioned. Competition is inertia and the simplicity of their current setup.',
              },
            },
          ],
        },
        {
          name: 'Compelling Event',
          status: 'missing',
          information: 'None identified',
          details: [
            {
              text: 'No external deadline mentioned (e.g., fiscal year end, open enrollment)',
              reasoning: {
                text: 'Timeline is self-imposed by Russell\'s optimization roadmap. This is lower urgency and could slip if the math doesn\'t work out.',
                verbatims: [
                  { quote: 'This is part of our Q1 optimization roadmap, not a must-have', timestamp: '00:26:45' },
                ],
              },
            },
          ],
        },
      ],
    },
    key_stakeholders: [
      {
        name: 'Russell Harris',
        avatar_color: 'bg-orange-400',
        buyer_persona: 'Technical Founder/Decision Maker',
        role_in_buying_process: 'Champion',
        tags: ['Economic Buyer'],
        role_and_engagement: 'Economic Buyer and Champion. Drove the agenda, requested specific math, and identified the primary blocker (subscriptions).',
        authority: 'Validated as decision-maker. Russell is driving the purchase.',
        key_concerns: 'Unit economics (margin preservation) and subscription retention.',
        risk: {
          level: 'MEDIUM',
          description: 'Will kill the deal if the math doesn\'t show clear margin growth.',
        },
      },
      {
        name: 'Theresa Bischof',
        avatar_color: 'bg-pink-400',
        buyer_persona: 'Brand/Marketing Lead',
        role_in_buying_process: 'Influencer',
        role_and_engagement: 'Brand/Customer Experience evaluator. Focused on the LMN expiration logic and how the customer is guided (FAQs).',
        key_concerns: 'Ensuring the "medical necessity" process doesn\'t confuse the customer or degrade the brand experience.',
        risk: {
          level: 'LOW',
          description: 'Seemed satisfied with the customizable templates.',
        },
      },
      {
        name: 'Yuliia Pyrohova',
        avatar_color: 'bg-cyan-400',
        buyer_persona: 'Technical Architect',
        role_in_buying_process: 'Influencer',
        role_and_engagement: 'Technical/QA. Focused on edge cases: "What if I have a vitamin for constipation but select anxiety?"',
        key_concerns: 'Ensuring the "Hidden SKU" / personalized product structure maps correctly to the medical conditions list.',
        risk: {
          level: 'LOW',
          description: '"Family of conditions" explanation appeared to resolve the immediate concern.',
        },
      },
    ],
  },
};
